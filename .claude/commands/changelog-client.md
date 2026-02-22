# /changelog-client

Generate a human-readable summary of recent changes for client communication.

## Arguments
$ARGUMENTS — Optional: "since v1.5.0", "last week", "last 10 commits", or empty (since last tag).

## Steps

1. Determine the range:
   - Version tag: from tag to HEAD
   - Time: from date to HEAD
   - Number: last N commits
   - Empty: from last git tag to HEAD

2. Read commits in range

3. Generate TWO versions:

### French
```
Bonjour,

Voici les dernières mises à jour de votre site :

• Ajout d'un formulaire de contact fonctionnel sur la page Contact
• Correction de l'affichage du menu sur mobile (le bouton ne répondait plus)
• Amélioration de la vitesse de chargement (les images se chargent progressivement)
• Mise à jour des textes de la page À propos selon vos retours

Le site est en ligne et à jour.
N'hésitez pas si vous avez des questions.
```

### English
Same content, translated.

## Rules
- NO technical jargon. Never say "component", "commit", "merge", "refactor", "deps".
- Write like talking to someone who doesn't know what code is.
- Group related changes (don't list 5 commits about the same fix).
- Focus on what CHANGED for the USER, not what changed in code.
- "feat(button): add icon variant" → "Ajout de boutons avec icônes"
- "fix(header): responsive menu z-index" → "Correction du menu sur mobile"
- "chore(deps): update react" → SKIP (client doesn't care)
- 5-10 bullet points maximum.
