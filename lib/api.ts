import axios, { AxiosInstance, AxiosResponse } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'

class ApiClient {
  private client: AxiosInstance

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL: baseURL || API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // Time out for 10 seconds
    })

    // Request Interceptor
    this.client.interceptors.request.use(
      (config) => {        
        // Import tokens from local storage
        if (typeof window !== 'undefined') {
          const userStr = localStorage.getItem('auth-storage')
          if (userStr) {
            try {
              const authData = JSON.parse(userStr)
              if (authData.state?.user?.token) {
                config.headers.Authorization = `Bearer ${authData.state.user.token}`
              }
            } catch (error) {
              console.error('Failed to parse auth data:', error)
            }
          }
        }
        
        return config
      },
      (error) => {
        console.error('Request error:', error)
        return Promise.reject(error)
      }
    )

    // Response Interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error) => {
        console.error(`API request failed:`, error)
        if (error.response) {
          // The server received a response, but the error status code
          const errorMessage = error.response.data?.message || `HTTP error! status: ${error.response.status}`
          
          // Automatic logout processing in case of 401 error
          if (error.response.status === 401) {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('auth-storage')
              window.location.href = '/'
            }
          }
          
          throw new Error(errorMessage)
        } else if (error.request) {
          // Request sent but did not receive a response
          throw new Error('Network error. Please check your connection.')
        } else {
          // Request configuration error
          throw new Error('Request configuration error.')
        }
      }
    )
  }

  // GET Request
  async get<T>(endpoint: string): Promise<T> {
    return this.client.get(endpoint)
  }

  // POST Request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.client.post(endpoint, data)
  }

  // PUT Request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.client.put(endpoint, data)
  }

  // DELETE Request
  async delete<T>(endpoint: string): Promise<T> {
    return this.client.delete(endpoint)
  }

  // PATCH Request
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.client.patch(endpoint, data)
  }
}

// API Instance
export const apiClient = new ApiClient()

// API Service Functions
export const mainSlideApi = {
  getAll: (): Promise<SlideItem[]> => apiClient.get<SlideItem[]>('/api/main-slides'),
}

export const productApi = {
  getAll: (): Promise<ProductItem[]> => apiClient.get<ProductItem[]>('/api/products'),
  getById: (id: number): Promise<ProductItem> => apiClient.get<ProductItem>(`/api/products/${id}`),
}

export const memberApi = {
  register: (data: MemberRegisterRequest): Promise<MemberRegisterResponse> => 
    apiClient.post<MemberRegisterResponse>('/api/members/register', data),
  login: (data: MemberLoginRequest): Promise<MemberLoginResponse> => 
    apiClient.post<MemberLoginResponse>('/api/members/login', data),
}

// Type Definition
export interface SlideItem {
  id: number
  url: string
  bgSrc: string
  title: string
  headline: string
  date: string
  imgSrc: string
  imgAlt: string
  createdAt: string
  updatedAt: string
}

export interface ProductItem {
  id: number
  tripType: string
  imgSrc: string
  discountRate?: number
  title: string
  infoGroup: string[]
  prevPrice: number
  currPrice: number
  rating: number
  sold: number
  createdAt: string
  updatedAt: string
}

export interface MemberRegisterRequest {
  email: string
  password: string
  marketingAgreed: boolean
}

export interface MemberRegisterResponse {
  id: number
  email: string
  marketingAgreed: boolean
  createdAt: string
  updatedAt: string
}

export interface MemberLoginRequest {
  email: string
  password: string
}

export interface MemberLoginResponse {
  id: number
  email: string
  token: string
  createdAt: string
  updatedAt: string
}
