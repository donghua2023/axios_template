// service统一出口
import DHRequest from './request'
import { BASE_URL, TIME_OUT} from './request/config'

const dhRequest = new DHRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      const token = ''
      if(token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err

    },
  }
})


export default dhRequest

