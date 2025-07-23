import axios from 'axios'
import { useAuth } from '../store/useAuth'

const api = axios.create({
  baseURL: 'https://map.gisdev.uz/api/',
})

// Attach token to each request
api.interceptors.request.use((config) => {
  const token = useAuth.getState().access_token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const auth = useAuth.getState()

    // === If the failed request IS the refresh token request ===
    if (
      error.response?.status === 401 &&
      originalRequest?.url?.includes('/user/token/refresh')
    ) {
      // Prevent infinite loop
      console.warn('Refresh token is invalid or expired. Logging out.')
      auth.logout()
      return Promise.reject(error)
    }

    // === Handle normal token refresh ===
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const success = await auth.refreshToken()

      if (success) {
        const token = auth.access_token
        if (token) {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          return api(originalRequest)
        }
      } else {
        // Failed to refresh → logout
        auth.logout()
      }
    }

    return Promise.reject(error)
  }
)

export default api
