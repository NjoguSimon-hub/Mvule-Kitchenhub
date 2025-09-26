const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000/api',
    MOCK_API_URL: 'http://localhost:3001'
  },
  production: {
    API_BASE_URL: 'https://mvule-catering-api.railway.app/api',
    MOCK_API_URL: 'https://mvule-catering-api.railway.app/api'
  }
}

const env = import.meta.env.MODE || 'development'
export const { API_BASE_URL, MOCK_API_URL } = config[env]