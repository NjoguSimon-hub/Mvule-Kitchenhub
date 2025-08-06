# Mvule Catering Backend

Secure Node.js/Express backend with M-Pesa integration, Google Maps tracking, and real-time features.

## 🚀 Features

### 🔐 Security
- JWT authentication with bcrypt password hashing
- Rate limiting (100 requests/15min, 5 auth attempts/15min)
- Helmet.js security headers
- Input validation with express-validator
- CORS protection
- Environment variable protection

### 💳 M-Pesa Integration
- STK Push for payments
- Real-time payment callbacks
- Payment status tracking
- Secure API key management

### 🗺️ Google Maps Integration
- Real-time delivery tracking
- Driver location updates
- Route calculation with ETA
- Address geocoding
- Nearby restaurant search

### 📡 Real-time Features
- Socket.io for live updates
- Order status notifications
- Payment confirmations
- Location tracking
- Driver-customer communication

## 📦 Installation

```bash
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development server
npm run dev

# Start production server
npm start
```

## 🔑 Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mvule-catering
JWT_SECRET=your-super-secret-jwt-key
MPESA_CONSUMER_KEY=your-mpesa-consumer-key
MPESA_CONSUMER_SECRET=your-mpesa-consumer-secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your-mpesa-passkey
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NODE_ENV=development
```

## 🛡️ API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/:orderId` - Get order details
- `PATCH /api/orders/:orderId/status` - Update order status
- `GET /api/orders` - Get all orders (admin)
- `DELETE /api/orders/:orderId` - Cancel order

### Payments
- `POST /api/payments/mpesa/stkpush` - Initiate M-Pesa payment
- `POST /api/payments/mpesa/callback` - M-Pesa callback handler
- `GET /api/payments/status/:orderId` - Check payment status

### Tracking
- `GET /api/tracking/order/:orderId` - Get delivery tracking info
- `POST /api/tracking/update-location` - Update driver location
- `GET /api/tracking/nearby` - Get nearby restaurants
- `POST /api/tracking/geocode` - Convert address to coordinates

## 🔒 Security Features

### Rate Limiting
- General API: 100 requests per 15 minutes
- Authentication: 5 attempts per 15 minutes
- IP-based tracking

### Authentication
- JWT tokens with 24-hour expiration
- Bcrypt password hashing (12 rounds)
- Role-based access control (admin/customer)

### Input Validation
- Email format validation
- Password strength requirements
- Phone number validation
- Address validation
- SQL injection prevention

### Headers Security
- XSS protection
- Content type sniffing prevention
- Clickjacking protection
- HTTPS enforcement in production

## 📱 Real-time Events

### Socket.io Events
- `new-order` - New order placed
- `status-update` - Order status changed
- `payment-success` - Payment completed
- `location-update` - Driver location updated
- `order-cancelled` - Order cancelled

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Use MongoDB Atlas for database
3. Deploy to Heroku/Railway/DigitalOcean
4. Set up SSL certificates
5. Configure domain CORS settings

### M-Pesa Setup
1. Register with Safaricom Developer Portal
2. Create Lipa Na M-Pesa application
3. Get Consumer Key and Secret
4. Set up callback URLs
5. Test with sandbox environment

### Google Maps Setup
1. Create Google Cloud Project
2. Enable Maps JavaScript API
3. Enable Directions API
4. Enable Places API
5. Set up API key restrictions

## 🔧 Development

```bash
# Install dependencies
npm install

# Start with nodemon
npm run dev

# Run tests
npm test

# Check security vulnerabilities
npm audit
```

## 📊 Monitoring

- Health check endpoint: `GET /api/health`
- Error logging with timestamps
- Request/response logging
- Performance monitoring ready

Built with ❤️ for Mvule Catering