import { API_BASE_URL } from '../config/api.js';

const api = {
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  createOrder: async (orderData) => {
    try {
      console.log('Creating order:', orderData);
      const response = await fetch(`${API_BASE_URL}/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();
      console.log('Order response:', result);
      return result;
    } catch (error) {
      console.error('Create order API error:', error);
      throw error;
    }
  },

  initiatePayment: async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/payments/mpesa/stkpush`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Payment API error:', error);
      return { success: false, message: 'Payment service unavailable' };
    }
  },

  trackOrder: async (orderId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tracking/order/${orderId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    } catch (error) {
      console.error('Tracking API error:', error);
      throw error;
    }
  }
};

export default api;