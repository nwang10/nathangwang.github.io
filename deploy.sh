#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Navigate to dist folder
cd dist

# Initialize git if not already
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

# Add all files
git add -A

# Commit
git commit -m "Deploy to GitHub Pages"

# Force push to gh-pages branch
git push -f https://github.com/nwang10/nathangwang.github.io.git gh-pages:gh-pages

echo "Deployed successfully!"
