# Mvule Catering - Restaurant Ordering App

A modern, full-featured restaurant ordering application built with React and Node.js.

## 🚀 Features

- **Modern UI**: Dark theme with professional React Icons
- **Complete Menu**: Real food images with category filtering
- **Shopping Cart**: Add items, manage quantities, checkout
- **User Authentication**: Customer and admin login systems
- **Admin Panel**: Manage featured items, view orders & analytics
- **Order Tracking**: Real-time order status and delivery tracking
- **Payment Integration**: M-Pesa STK Push integration
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Socket.io for live order updates

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Context API** for state management
- **CSS Variables** for theming
- **React Icons** for UI icons

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** authentication
- **Socket.io** for real-time updates
- **M-Pesa API** integration
- **Security**: Helmet, CORS, Rate limiting

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### 1. Clone Repository
```bash
git clone https://github.com/automatebyte/Mvule-Kitchenhub.git
cd Mvule-Kitchenhub
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Environment Setup
Create `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mvule-catering
JWT_SECRET=your_jwt_secret_key
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_mpesa_passkey
```

### 4. Start Development Servers

#### Option A: Start All Services (Recommended)
```bash
npm run start:all
```

#### Option B: Start Individually
```bash
# Terminal 1: Frontend (React)
npm run dev

# Terminal 2: Mock API (JSON Server)
npm run server

# Terminal 3: Backend API (Node.js)
npm run backend
```

### 5. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Mock API**: http://localhost:3001

## 🔑 Demo Credentials

### Admin Access
- **URL**: `/admin-login`
- **Username**: admin
- **Password**: admin123

### Customer Registration
- Create account at `/register`
- Choose "Customer" or "Restaurant Admin" role

## 🎯 Key Features

### Customer Features
1. **Browse Menu**: View categorized food items with images
2. **Shopping Cart**: Add items, manage quantities
3. **User Authentication**: Register/login system
4. **Checkout**: Complete order with delivery details
5. **Order Tracking**: Real-time order status updates
6. **Payment**: M-Pesa integration for payments

### Admin Features
1. **Dashboard**: Analytics and order management
2. **Featured Items**: Manage today's specials
3. **Order Management**: View and update order status
4. **Real-time Updates**: Live order notifications

## 📱 Pages & Routes

- `/` - Home with hero section and specials
- `/menu` - Complete menu with filtering
- `/cart` - Shopping cart management
- `/checkout` - Order placement
- `/login` - Customer login
- `/register` - Customer registration
- `/dashboard` - Customer dashboard
- `/my-orders` - Customer order history
- `/track` - Public order tracking
- `/admin-login` - Admin authentication
- `/admin` - Admin dashboard

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:id` - Get order details
- `PATCH /api/orders/:id/status` - Update order status

### Payments
- `POST /api/payments/mpesa/stkpush` - Initiate M-Pesa payment
- `POST /api/payments/mpesa/callback` - M-Pesa callback

### Tracking
- `GET /api/tracking/order/:id` - Get delivery tracking
- `POST /api/tracking/update-location` - Update driver location

## 🚀 Deployment

### Frontend (Netlify)
1. Build the project: `npm run build`
2. Deploy `dist` folder to Netlify
3. Configure redirects in `netlify.toml`

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy backend folder
3. Update frontend API URLs

## 💰 Currency

All prices displayed in Kenyan Shillings (KSh)

## 🎨 Design System

- **Theme**: Dark grayish theme
- **Colors**: Orange primary (#ff6b35)
- **Typography**: Inter font family
- **Layout**: CSS Grid and Flexbox
- **Responsive**: Mobile-first approach

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- Rate limiting
- CORS protection
- Input validation
- XSS protection with Helmet

## 📊 Real-time Features

- Live order updates
- Real-time delivery tracking
- Admin notifications
- Socket.io integration

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

---

Built with ❤️ for Mvule Catering