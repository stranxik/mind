#!/bin/bash

# Variables pour suivre l'état
RULES_READ=false
DATE_CHECKED=false
WORKSPACE_ANALYZED=false

# Chemins des fichiers
RULES_FILE="cursor-template/.cursorrules"
DATE_CHECK_FILE="cursor-template/utils/last_date_check"
WORKSPACE_ANALYSIS_FILE="cursor-template/utils/workspace_analysis"

# Fonction pour vérifier si les règles ont été lues
check_rules() {
    if [ -f "$RULES_FILE" ]; then
        echo "✓ Fichier .cursorrules trouvé"
        RULES_READ=true
    else
        echo "✗ Fichier .cursorrules non trouvé"
    fi
}

# Fonction pour vérifier si la date a été obtenue
check_date() {
    if [ -f "$DATE_CHECK_FILE" ] && [ $(($(date +%s) - $(stat -f %m "$DATE_CHECK_FILE"))) -lt 300 ]; then
        echo "✓ Date vérifiée récemment"
        DATE_CHECKED=true
    else
        echo "✗ Date non vérifiée récemment"
    fi
}

# Fonction pour vérifier si le workspace a été analysé
check_workspace() {
    if [ -f "$WORKSPACE_ANALYSIS_FILE" ] && [ $(($(date +%s) - $(stat -f %m "$WORKSPACE_ANALYSIS_FILE"))) -lt 300 ]; then
        echo "✓ Workspace analysé récemment"
        WORKSPACE_ANALYZED=true
    else
        echo "✗ Workspace non analysé récemment"
    fi
}

# Exécution des vérifications
echo "=== VÉRIFICATION DE L'INITIALISATION ==="
check_rules
check_date
check_workspace

# Résumé
if $RULES_READ && $DATE_CHECKED && $WORKSPACE_ANALYZED; then
    echo -e "\n✅ Toutes les étapes d'initialisation ont été complétées"
    exit 0
else
    echo -e "\n❌ Certaines étapes n'ont pas été complétées"
    echo "Veuillez exécuter ./cursor-template/utils/init_conversation.sh"
    exit 1
fi 