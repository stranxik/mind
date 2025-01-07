# Frontend Football Analytics Platform

## Architecture

Le frontend est construit avec Next.js 13+, utilisant les dernières fonctionnalités comme le App Router et les Server Components. L'interface utilise Tailwind CSS et shadcn/ui pour un design moderne et responsive.

## Configuration des Données

Le frontend peut fonctionner avec deux sources de données :

### 1. Données Mockées (Mode Actuel)

Actuellement, l'application utilise des données statiques stockées dans `data/stats.json`. Ce mode est utile pour :
- Le développement sans dépendance au backend
- Les tests et le prototypage rapide
- La démonstration hors-ligne

### 2. API Backend (Mode Production)

Pour passer aux données réelles de l'API, suivez ces étapes :

1. **Installation des dépendances**
   ```bash
   npm install axios
   ```

2. **Configuration des variables d'environnement**
   ```bash
   # .env.local
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

3. **Modification des composants**

   Exemple de passage des mocks à l'API pour la page des statistiques :

   ```typescript
   // Avant (avec mock data)
   import statsData from "@/data/stats.json"
   
   export default function StatsPage() {
     const teams = statsData.teams;
     // ...
   }

   // Après (avec API réelle)
   import { getTeams, getMatches, getTopScorers } from '@/services/api';
   
   export default function StatsPage() {
     const [teams, setTeams] = useState<Team[]>([]);
     
     useEffect(() => {
       const fetchData = async () => {
         const { data } = await getTeams();
         setTeams(data);
       };
       fetchData();
     }, []);
     // ...
   }
   ```

4. **Gestion des États de Chargement**
   ```typescript
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   if (loading) return <div>Chargement...</div>;
   if (error) return <div>{error}</div>;
   ```

## Services API

Les services API sont déjà configurés dans `services/api.ts` :

```typescript
// Endpoints disponibles
getLeagues()              // Récupère toutes les ligues
getTeams(leagueId?)      // Récupère les équipes (filtrable par ligue)
getPlayers(teamId?)      // Récupère les joueurs (filtrable par équipe)
getMatches(params)       // Récupère les matches avec filtres
getTopScorers(leagueId?) // Récupère les meilleurs buteurs
```

## WebSockets pour les Données en Temps Réel

Pour les mises à jour en direct (scores, événements) :

```typescript
const ws = connectToWebSocket(matchId);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Mettre à jour l'interface
};
```

## Types TypeScript

Les types sont définis dans `types/index.ts` :
- `League` - Structure d'une ligue
- `Team` - Structure d'une équipe
- `Player` - Structure d'un joueur
- `Match` - Structure d'un match

## Étapes pour Passer en Production

1. **Vérification du Backend**
   ```bash
   # Tester que le backend est accessible
   curl http://localhost:8000/health
   ```

2. **Configuration des Variables d'Environnement**
   ```bash
   # .env.production
   NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
   ```

3. **Build de Production**
   ```bash
   npm run build
   npm start
   ```

## Bonnes Pratiques

1. **Gestion des Erreurs**
   - Toujours implémenter des fallbacks
   - Afficher des messages d'erreur utilisateur-friendly
   - Logger les erreurs côté développeur

2. **Performance**
   - Utiliser le cache quand possible
   - Implémenter la pagination pour les grandes listes
   - Optimiser les requêtes avec des filtres appropriés

3. **État de l'Application**
   - Considérer l'utilisation de React Query ou SWR pour la gestion du cache
   - Implémenter un state management (Redux, Zustand) si nécessaire

## Tests

Les tests doivent être adaptés lors du passage aux données réelles :

```typescript
// Mocking Axios pour les tests
jest.mock('axios');

test('loads and displays teams', async () => {
  // Mock de la réponse API
  axios.get.mockResolvedValueOnce({
    data: [{ id: 1, name: 'Team 1' }]
  });

  render(<StatsPage />);
  await waitFor(() => {
    expect(screen.getByText('Team 1')).toBeInTheDocument();
  });
});
```

## Gestion Avancée du State

### React Query

React Query est recommandé pour la gestion des données serveur. Voici comment l'implémenter :

1. **Installation**
   ```bash
   npm install @tanstack/react-query
   ```

2. **Configuration**
   ```typescript
   // app/providers.tsx
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   
   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 60 * 1000, // 1 minute
         cacheTime: 5 * 60 * 1000, // 5 minutes
         refetchOnWindowFocus: false,
       },
     },
   });
   
   export function Providers({ children }: { children: React.ReactNode }) {
     return (
       <QueryClientProvider client={queryClient}>
         {children}
       </QueryClientProvider>
     );
   }
   ```

3. **Utilisation avec nos API**
   ```typescript
   // hooks/useTeams.ts
   import { useQuery } from '@tanstack/react-query';
   import { getTeams } from '@/services/api';
   
   export function useTeams(leagueId?: string) {
     return useQuery({
       queryKey: ['teams', leagueId],
       queryFn: () => getTeams(leagueId),
       select: (data) => data.data,
     });
   }
   
   // Utilisation dans un composant
   function TeamsList() {
     const { data: teams, isLoading, error } = useTeams();
     
     if (isLoading) return <div>Chargement...</div>;
     if (error) return <div>Erreur: {error.message}</div>;
     
     return (
       <ul>
         {teams.map(team => (
           <li key={team.id}>{team.name}</li>
         ))}
       </ul>
     );
   }
   ```

### SWR (Alternative)

SWR est plus léger et s'intègre parfaitement avec Next.js :

1. **Installation**
   ```bash
   npm install swr
   ```

2. **Configuration**
   ```typescript
   // app/providers.tsx
   import { SWRConfig } from 'swr';
   
   export function Providers({ children }: { children: React.ReactNode }) {
     return (
       <SWRConfig 
         value={{
           fetcher: (url) => fetch(url).then(res => res.json()),
           revalidateOnFocus: false,
           dedupingInterval: 60000,
         }}
       >
         {children}
       </SWRConfig>
     );
   }
   ```

3. **Utilisation**
   ```typescript
   import useSWR from 'swr';
   
   function TeamsList() {
     const { data, error, isLoading } = useSWR('/api/teams');
     
     if (isLoading) return <div>Chargement...</div>;
     if (error) return <div>Erreur</div>;
     
     return (
       <ul>
         {data.map(team => (
           <li key={team.id}>{team.name}</li>
         ))}
       </ul>
     );
   }
   ```

## Tests Approfondis

### 1. Configuration Jest

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/services/(.*)$': '<rootDir>/services/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};

// jest.setup.js
import '@testing-library/jest-dom';
```

### 2. Types de Tests

1. **Tests Unitaires**
   ```typescript
   // components/TeamCard.test.tsx
   import { render, screen } from '@testing-library/react';
   import { TeamCard } from './TeamCard';
   
   describe('TeamCard', () => {
     const mockTeam = {
       id: '1',
       name: 'PSG',
       stats: { points: 45 }
     };
   
     it('affiche les informations de l\'équipe', () => {
       render(<TeamCard team={mockTeam} />);
       expect(screen.getByText('PSG')).toBeInTheDocument();
       expect(screen.getByText('45')).toBeInTheDocument();
     });
   });
   ```

2. **Tests d'Intégration**
   ```typescript
   // pages/stats.test.tsx
   import { render, screen, waitFor } from '@testing-library/react';
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
   import StatsPage from './stats';
   
   const queryClient = new QueryClient();
   
   describe('StatsPage', () => {
     it('charge et affiche les données', async () => {
       render(
         <QueryClientProvider client={queryClient}>
           <StatsPage />
         </QueryClientProvider>
       );
   
       expect(screen.getByText('Chargement...')).toBeInTheDocument();
   
       await waitFor(() => {
         expect(screen.getByText('Classement')).toBeInTheDocument();
       });
     });
   });
   ```

3. **Tests E2E avec Cypress**
   ```typescript
   // cypress/e2e/stats.cy.ts
   describe('Page Statistiques', () => {
     beforeEach(() => {
       cy.visit('/stats');
     });
   
     it('permet de filtrer les équipes', () => {
       cy.get('[data-testid="league-select"]').click();
       cy.get('[data-testid="league-option-ligue1"]').click();
       cy.get('[data-testid="teams-list"]')
         .should('contain', 'PSG')
         .and('contain', 'Marseille');
     });
   });
   ```

## Configuration Production

### 1. Optimisation des Performances

1. **Analyse du Bundle**
   ```bash
   npm install -D @next/bundle-analyzer
   ```
   ```javascript
   // next.config.js
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true',
   });
   
   module.exports = withBundleAnalyzer({
     // config
   });
   ```

2. **Optimisation des Images**
   ```typescript
   // next.config.js
   module.exports = {
     images: {
       domains: ['api.votre-domaine.com'],
       formats: ['image/avif', 'image/webp'],
     },
   };
   ```

### 2. Configuration Docker Multi-Stage

```dockerfile
# Dockerfile.prod
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### 3. Configuration Nginx

```nginx
# nginx/default.conf
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://frontend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://backend:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 4. Variables d'Environnement Production

```env
# .env.production
NEXT_PUBLIC_API_URL=https://api.votre-domaine.com
NEXT_PUBLIC_WS_URL=wss://api.votre-domaine.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 5. Monitoring et Analytics

1. **Sentry pour le Monitoring**
   ```bash
   npm install @sentry/nextjs
   ```
   ```javascript
   // sentry.client.config.js
   import * as Sentry from '@sentry/nextjs';
   
   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     tracesSampleRate: 1.0,
   });
   ```

2. **Google Analytics**
   ```typescript
   // lib/gtag.ts
   export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;
   
   export const pageview = (url: string) => {
     window.gtag('config', GA_TRACKING_ID, {
       page_path: url,
     });
   };
   