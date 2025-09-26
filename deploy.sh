#!/bin/bash

echo "🚀 Deploying Mvule Catering Application..."

# Build frontend
echo "📦 Building frontend..."
npm run build

# Deploy to Netlify (if netlify-cli is installed)
if command -v netlify &> /dev/null; then
    echo "🌐 Deploying to Netlify..."
    netlify deploy --prod --dir=dist
else
    echo "⚠️  Netlify CLI not found. Please install: npm install -g netlify-cli"
    echo "📁 Built files are in ./dist directory"
fi

# Deploy backend to Railway (if railway-cli is installed)
if command -v railway &> /dev/null; then
    echo "🚂 Deploying backend to Railway..."
    cd backend
    railway deploy
    cd ..
else
    echo "⚠️  Railway CLI not found. Please install: npm install -g @railway/cli"
fi

echo "✅ Deployment complete!"
echo ""
echo "📋 Manual deployment options:"
echo "Frontend: Upload ./dist folder to Netlify/Vercel"
echo "Backend: Deploy ./backend folder to Railway/Heroku"