const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const router = express.Router();

// M-Pesa STK Push
router.post('/mpesa/stkpush', async (req, res) => {
  try {
    const { phone, amount, orderId } = req.body;
    
    // Get M-Pesa access token
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
    
    const tokenResponse = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });
    
    const accessToken = tokenResponse.data.access_token;
    
    // Generate timestamp and password
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');
    
    // STK Push request
    const stkResponse = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: `${process.env.BASE_URL}/api/payments/mpesa/callback`,
      AccountReference: `Order-${orderId}`,
      TransactionDesc: 'Mvule Catering Payment'
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    res.json({
      success: true,
      message: 'STK Push sent successfully',
      data: stkResponse.data
    });
    
  } catch (error) {
    console.error('M-Pesa STK Push error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Payment initiation failed',
      error: error.response?.data || error.message
    });
  }
});

// M-Pesa callback
router.post('/mpesa/callback', (req, res) => {
  const { Body } = req.body;
  
  if (Body.stkCallback.ResultCode === 0) {
    // Payment successful
    const orderId = Body.stkCallback.CallbackMetadata.Item.find(item => item.Name === 'AccountReference')?.Value;
    
    // Update order status
    const io = req.app.get('io');
    io.to(`order-${orderId}`).emit('payment-success', {
      orderId,
      transactionId: Body.stkCallback.CallbackMetadata.Item.find(item => item.Name === 'MpesaReceiptNumber')?.Value
    });
    
    console.log('Payment successful for order:', orderId);
  } else {
    // Payment failed
    console.log('Payment failed:', Body.stkCallback.ResultDesc);
  }
  
  res.json({ ResultCode: 0, ResultDesc: 'Success' });
});

// Payment status check
router.get('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Check payment status in database
    // This would typically query your database for payment status
    
    res.json({
      success: true,
      orderId,
      status: 'pending', // or 'completed', 'failed'
      message: 'Payment status retrieved'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get payment status',
      error: error.message
    });
  }
});

module.exports = router;