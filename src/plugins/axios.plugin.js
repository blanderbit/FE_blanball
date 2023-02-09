import axios from 'axios/index'

import { ErrorInterceptor } from '../interseptors/error.interseptor'
import { UrlInterceptor } from '../interseptors/url.interseptor'
import { TokenInterceptor } from '../interseptors/token.interseptor'
import { ResponseInterceptor } from '../interseptors/response.interseptor'

if (!process.env.API_BASE_URL) {
  throw new Error(
    `Please create .env (npm run create:env) and change variable correctly, focus on API_BASE_URL`
  )
}

const createApi = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.API_BASE_URL,
  })

  axiosInstance.interceptors.request.use(UrlInterceptor)
  axiosInstance.interceptors.request.use(TokenInterceptor)

  axiosInstance.interceptors.response.use(ResponseInterceptor, ErrorInterceptor)

  return axiosInstance
}

export const AxiosInstance = createApi()
