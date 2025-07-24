import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../api/axios'

interface Credentials {
  email: string
  password: string
}

interface AuthTokens {
  access: string
  refresh: string
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    role: string | null
    department: string | null
  }
}

interface AuthState {
  isAuthenticated: boolean
  access_token: string | null
  refresh_token: string | null
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    role: string | null
    department: string | null
  } | null
  login: (credentials: Credentials) => Promise<boolean>
  logout: () => void
  refreshToken: () => Promise<boolean>
}

export const useAuth = create<AuthState>()(
  persist(
    ((set, get) => ({
      isAuthenticated: false,
      access_token: null,
      refresh_token: null,
      user: null,

      login: async (credentials: Credentials) => {
        try {
          const res = await api.post<AuthTokens>('/user/login/', credentials)

          if (res.status === 201 || res.status === 200) {
            const { access, refresh, user } = res.data

            set({
              access_token: access,
              refresh_token: refresh,
              isAuthenticated: true,
              user,
            })

            return true
          }

          return false
        } catch (error) {
          console.error('Login failed:', error)
          return false
        }
      },

      refreshToken: async () => {
        try {
          const { refresh_token } = get()

          if (!refresh_token) return false

          const res = await api.post<AuthTokens>('/user/token/refresh/', {
            refresh: refresh_token,
          })

          if (res.status === 200) {
            set({
              access_token: res.data.access,
              isAuthenticated: true,
            })
            return true
          } else {
            get().logout()
            return false
          }
        } catch (error) {
          console.error('Token refresh failed:', error)
          get().logout()
          return false
        }
      },

      logout: () => {
        set({
          isAuthenticated: false,
          access_token: null,
          refresh_token: null,
          user: null,
        })
      },
    })) as import('zustand').StateCreator<AuthState, [], [], AuthState>,
    {
      name: 'auth-storage',
      partialize: (state) => ({
        access_token: state.access_token,
        refresh_token: state.refresh_token,
        isAuthenticated: state.isAuthenticated,
        user: state.user
      }),
    }
  )
)
