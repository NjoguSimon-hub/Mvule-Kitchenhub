# Quick Setup Guide

## 🚀 Quick Start (Recommended)

### For Linux/Mac:
```bash
./start.sh
```

### For Windows:
```bash
start.bat
```

## 📋 Manual Setup

### 1. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
cd ..
```

### 2. Start Services

#### Option A: All at once
```bash
npm run start:all
```

#### Option B: Individual terminals
```bash
# Terminal 1: Frontend
npm run dev

# Terminal 2: Mock API
npm run server

# Terminal 3: Backend API
cd backend && npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Mock API**: http://localhost:3001

## 🔑 Demo Credentials

### Admin Login
- URL: http://localhost:5173/admin-login
- Username: `admin`
- Password: `admin123`

### Customer Account
- Create new account at: http://localhost:5173/register
- Or use existing demo data

## 🛠️ Troubleshooting

### Port Already in Use
If ports are busy, kill processes:
```bash
# Kill processes on specific ports
lsof -ti:5173 | xargs kill -9
lsof -ti:5000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
```

### MongoDB Connection (Optional)
The app works without MongoDB using mock data. To use MongoDB:
1. Install MongoDB locally or use MongoDB Atlas
2. Update `backend/.env` with your MongoDB URI
3. Restart backend server

## 📱 Testing the App

1. **Browse Menu**: Go to http://localhost:5173/menu
2. **Add to Cart**: Click "Add to Cart" on any item
3. **Checkout**: Go to cart and proceed to checkout
4. **Admin Panel**: Login as admin to manage orders
5. **Order Tracking**: Use order ID to track delivery

## 🎯 Key Features to Test

- [x] Menu browsing and filtering
- [x] Shopping cart functionality
- [x] User registration/login
- [x] Order placement
- [x] Admin dashboard
- [x] Order tracking
- [x] Responsive design

## 🆘 Need Help?

Check the main README.md for detailed documentation or create an issue on GitHub.