const express = require('express');
const axios = require('axios');
const router = express.Router();

// Get delivery location and ETA
router.get('/order/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Mock delivery data - in production, this would come from your database
    const deliveryData = {
      orderId,
      status: 'in_transit',
      driverLocation: {
        lat: -1.2921,
        lng: 36.8219
      },
      customerLocation: {
        lat: -1.2864,
        lng: 36.8172
      },
      estimatedArrival: new Date(Date.now() + 25 * 60 * 1000), // 25 minutes from now
      driverInfo: {
        name: 'John Kamau',
        phone: '+254712345678',
        vehicle: 'Motorcycle - KCA 123A'
      }
    };
    
    // Calculate route using Google Maps API
    const origin = `${deliveryData.driverLocation.lat},${deliveryData.driverLocation.lng}`;
    const destination = `${deliveryData.customerLocation.lat},${deliveryData.customerLocation.lng}`;
    
    const routeResponse = await axios.get(`https://maps.googleapis.com/maps/api/directions/json`, {
      params: {
        origin,
        destination,
        key: process.env.GOOGLE_MAPS_API_KEY,
        mode: 'driving'
      }
    });
    
    if (routeResponse.data.status === 'OK') {
      const route = routeResponse.data.routes[0];
      deliveryData.route = {
        distance: route.legs[0].distance.text,
        duration: route.legs[0].duration.text,
        polyline: route.overview_polyline.points
      };
    }
    
    res.json({
      success: true,
      data: deliveryData
    });
    
  } catch (error) {
    console.error('Tracking error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get tracking information',
      error: error.message
    });
  }
});

// Update driver location (called by driver app)
router.post('/update-location', async (req, res) => {
  try {
    const { orderId, lat, lng, driverId } = req.body;
    
    // Update driver location in database
    // In production, you'd save this to your database
    
    // Emit real-time update to customer
    const io = req.app.get('io');
    io.to(`order-${orderId}`).emit('location-update', {
      orderId,
      driverLocation: { lat, lng },
      timestamp: new Date()
    });
    
    res.json({
      success: true,
      message: 'Location updated successfully'
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update location',
      error: error.message
    });
  }
});

// Get nearby restaurants/pickup points
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query;
    
    const placesResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: `${lat},${lng}`,
        radius,
        type: 'restaurant',
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });
    
    res.json({
      success: true,
      data: placesResponse.data.results.slice(0, 10) // Limit to 10 results
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get nearby locations',
      error: error.message
    });
  }
});

// Geocode address
router.post('/geocode', async (req, res) => {
  try {
    const { address } = req.body;
    
    const geocodeResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address,
        key: process.env.GOOGLE_MAPS_API_KEY
      }
    });
    
    if (geocodeResponse.data.status === 'OK') {
      const location = geocodeResponse.data.results[0].geometry.location;
      res.json({
        success: true,
        data: {
          lat: location.lat,
          lng: location.lng,
          formatted_address: geocodeResponse.data.results[0].formatted_address
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Address not found'
      });
    }
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Geocoding failed',
      error: error.message
    });
  }
});

module.exports = router;