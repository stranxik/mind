#!/bin/bash

# Définition des fichiers de marqueurs
RULES_FILE="cursor-template/.cursorrules"
DATE_CHECK_FILE="cursor-template/utils/last_date_check"
WORKSPACE_ANALYSIS_FILE="cursor-template/utils/workspace_analysis"

echo "=== INITIALISATION DE LA CONVERSATION ==="

# 1. Vérification et lecture des règles
echo "1. Lecture des règles..."
if [ -f "$RULES_FILE" ]; then
    cat "$RULES_FILE"
    echo "✓ Règles lues avec succès"
else
    echo "❌ Erreur: Fichier .cursorrules non trouvé dans $RULES_FILE"
    exit 1
fi

# 2. Obtention de la date
echo -e "\n2. Obtention de la date..."
if LC_TIME=fr_FR.UTF-8 date "+%A %d %B %Y, %H:%M"; then
    touch "$DATE_CHECK_FILE"
    echo "✓ Date obtenue et marqueur créé"
else
    echo "❌ Erreur lors de l'obtention de la date"
    exit 1
fi

# 3. Analyse du workspace
echo -e "\n3. Analyse du workspace..."
echo "Structure du projet :"
if ls -R . > "$WORKSPACE_ANALYSIS_FILE" 2>&1; then
    echo "✓ Analyse du workspace complétée et sauvegardée"
else
    echo "❌ Erreur lors de l'analyse du workspace"
    exit 1
fi

echo -e "\nInitialisation terminée avec succès. Vous pouvez maintenant commencer la conversation."

# Vérification finale
./cursor-template/utils/check_init.sh 