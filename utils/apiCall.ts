import axios, { AxiosInstance, AxiosPromise } from 'axios'
import { parseCookies } from 'nookies'

const baseURL = 'http://localhost:3000/api'

const instance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

instance.interceptors.request.use(
  (config) => {
    const { token } = parseCookies()
    if (token) {
      return {
        ...config,
        headers: { ...config.headers, Authorization: `Bearer ${token}` },
      }
    }

    return config
  },
  (error) => Promise.reject(error)
)

export const login = (username: string, password: string): AxiosPromise =>
  instance({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  })

export const getTableData = (): AxiosPromise =>
  instance({
    url: '/table',
    method: 'GET',
  })
