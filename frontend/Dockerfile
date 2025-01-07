FROM node:20-slim

WORKDIR /app

# Installation de pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copie des fichiers de dépendances
COPY package.json pnpm-lock.yaml ./

# Installation des dépendances avec pnpm
RUN pnpm install --frozen-lockfile

# Copie du code source
COPY . .

# Exposition du port
EXPOSE 3000

# Commande par défaut
CMD ["pnpm", "dev"] 