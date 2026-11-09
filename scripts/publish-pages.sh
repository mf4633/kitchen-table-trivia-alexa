#!/usr/bin/env bash
# Create the public repo, push, and serve docs/ (privacy, terms, icons) on GitHub Pages.
set -euo pipefail
cd "$(dirname "$0")/.."
gh repo create mf4633/kitchen-table-trivia-alexa --public \
  --description "Kitchen Table Trivia: a daily trivia question for every player in the house, for Alexa" --source . --push
gh api -X POST repos/mf4633/kitchen-table-trivia-alexa/pages \
  -f "source[branch]=master" -f "source[path]=/docs" >/dev/null
echo "Pages enabled. First build takes 1-3 minutes:"
echo "  https://mf4633.github.io/kitchen-table-trivia-alexa/privacy.html"
