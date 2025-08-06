const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Mock orders database
let orders = [
  {
    id: 1,
    customerId: 1,
    items: [
      { menuId: 1, quantity: 2, price: 650 },
      { menuId: 4, quantity: 1, price: 450 }
    ],
    total: 1750,
    status: 'confirmed',
    paymentStatus: 'paid',
    deliveryAddress: 'Nairobi CBD, Kenya',
    customerLocation: { lat: -1.2864, lng: 36.8172 },
    placedAt: new Date(),
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000)
  }
];

// Create new order
router.post('/create', [
  body('items').isArray({ min: 1 }).withMessage('Order must contain at least one item'),
  body('deliveryAddress').trim().isLength({ min: 5 }).withMessage('Valid delivery address required'),
  body('phone').isMobilePhone('any').withMessage('Valid phone number required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { items, deliveryAddress, phone, customerLocation, notes } = req.body;
    
    // Calculate total
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order
    const newOrder = {
      id: orders.length + 1,
      customerId: req.user?.id || 1, // From JWT middleware
      items,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      deliveryAddress,
      phone,
      customerLocation,
      notes,
      placedAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 45 * 60 * 1000) // 45 minutes
    };
    
    orders.push(newOrder);
    
    // Emit real-time update
    const io = req.app.get('io');
    io.emit('new-order', newOrder);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: newOrder
    });
    
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// Get order by ID
router.get('/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const order = orders.find(o => o.id === parseInt(orderId));
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    res.json({
      success: true,
      data: order
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get order',
      error: error.message
    });
  }
});

// Update order status
router.patch('/:orderId/status', [
  body('status').isIn(['pending', 'confirmed', 'preparing', 'ready', 'in_transit', 'delivered', 'cancelled'])
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
        errors: errors.array()
      });
    }

    const { orderId } = req.params;
    const { status } = req.body;
    
    const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date();
    
    // Emit real-time update
    const io = req.app.get('io');
    io.to(`order-${orderId}`).emit('status-update', {
      orderId,
      status,
      timestamp: new Date()
    });
    
    res.json({
      success: true,
      message: 'Order status updated',
      data: orders[orderIndex]
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message
    });
  }
});

// Get all orders (admin)
router.get('/', (req, res) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    
    let filteredOrders = orders;
    if (status) {
      filteredOrders = orders.filter(o => o.status === status);
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        total: filteredOrders.length,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(filteredOrders.length / limit)
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get orders',
      error: error.message
    });
  }
});

// Cancel order
router.delete('/:orderId', (req, res) => {
  try {
    const { orderId } = req.params;
    const orderIndex = orders.findIndex(o => o.id === parseInt(orderId));
    
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }
    
    const order = orders[orderIndex];
    
    // Only allow cancellation if order is not being prepared
    if (['preparing', 'ready', 'in_transit', 'delivered'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order at this stage'
      });
    }
    
    orders[orderIndex].status = 'cancelled';
    orders[orderIndex].cancelledAt = new Date();
    
    // Emit real-time update
    const io = req.app.get('io');
    io.to(`order-${orderId}`).emit('order-cancelled', {
      orderId,
      timestamp: new Date()
    });
    
    res.json({
      success: true,
      message: 'Order cancelled successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order',
      error: error.message
    });
  }
});

module.exports = router;