# Automatisierte Changelog-Erstellung mit Husky, Conventional Commits und Commitlint
Dieses Projekt ist ein Teil des BudgetBook-Projekts und implementiert eine automatisierte Methode zur Erstellung von Changelogs unter Verwendung von Husky, Conventional Commits und Commitlint.
 ## Installation
Um das Projekt lokal einzurichten, führen Sie bitte die folgenden Schritte aus:
**GitHub-Repository clonen**:
```bash
 git clone https://github.com/TS-BudgetBook/budgetbook.git
# Branch erstellen: 
git checkout -b feature/changelog
 # Husky installieren: Husky ist ein Tool, das Git Hooks verwendet, um automatisierte Aufgaben vor oder nach Git-Ereignissen auszuführen.
npm install husky --save-dev
 # Conventional Commits installieren: Conventional Commits sind ein Standard für Commit-Nachrichten, um sicherzustellen, dass sie einem standardisierten Format folgen. https://www.conventionalcommits.org/en/v1.0.0/
npm install @commitlint/{config-conventional,cli} --save-dev
 # GitHub Actions für Changelog-Erstellung installieren: Wir nutzen die GitHub Actions, um automatisch ein Changelog basierend auf den Conventional Commits zu generieren. https://docs.github.com/de/actions
npm install requarks/changelog-action@v1 --save-dev


