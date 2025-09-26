# 🚀 Deployment Guide

## Quick Deploy

### Automated Deployment
```bash
./deploy.sh
```

## Manual Deployment

### Frontend (Netlify/Vercel)

#### Netlify
1. Build: `npm run build`
2. Upload `dist/` folder to Netlify
3. Set redirects: `/*` → `/index.html` (200)

#### Vercel
1. Connect GitHub repo
2. Build command: `npm run build`
3. Output directory: `dist`

### Backend (Railway/Heroku)

#### Railway
1. Connect GitHub repo to Railway
2. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
3. Deploy from `backend/` folder

#### Heroku
1. Create Heroku app
2. Set buildpacks: `heroku/nodejs`
3. Set environment variables
4. Deploy: `git subtree push --prefix backend heroku main`

## Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/mvule
JWT_SECRET=your_super_secret_jwt_key
MPESA_CONSUMER_KEY=your_mpesa_key
MPESA_CONSUMER_SECRET=your_mpesa_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
```

### Frontend
Update `src/config/api.js` with production API URL

## Live URLs
- **Frontend**: https://mvule-catering.netlify.app
- **Backend**: https://mvule-catering-api.railway.app

## Post-Deployment
1. Test all features
2. Update API URLs in frontend config
3. Test payment integration
4. Verify admin dashboard