import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
// 拦截器接口
export interface DHRequestInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig, // 请求成功的拦截器
  requestFailureFn?: (err: any) => any,                             // 请求失败的拦截器
  responseSuccessFn?: (res: T) => T,             // 响应成功的拦截器
  responseFailureFn?: (err: any) => any                             // 响应失败的拦截器
}

export interface DHRequestConfig<T = AxiosResponse> extends InternalAxiosRequestConfig {
  interceptors?: DHRequestInterceptors<T>
  showLoading?: boolean
}
