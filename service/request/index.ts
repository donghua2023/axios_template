// 对axios封装
import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { DHRequestInterceptors, DHRequestConfig} from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

class DHRequest {
  instance: AxiosInstance
  interceptors?: DHRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean

  constructor(config: DHRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? true
    // 使用拦截器
    // 添加所有的实例都有拦截器
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有的实例都有的拦截器: 响应成功');
        this.loading?.close()
        return res.data
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 响应失败');
        this.loading?.close()
        return err
      }
    )
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有的实例都有的拦截器: 请求成功');

        if(this.showLoading) {
          this.loading =  ElLoading.service({
            lock: true,
            text: '正在加载...',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有的实例都有的拦截器: 请求失败');
        return err
      }
    )

    // 从config中取出的拦截器是对应的的实例的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )
    // 响应拦截器
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )

  }

  request<T = any>(config: DHRequestConfig<T>): Promise<T> {
    // 单次请求的成功拦截处理
    if(config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    // 返回promise
    return new Promise<T>((resolve, reject) => {
      if(config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance.request<any, T>(config).then((res)=> {
        // 单个响应对数据的处理
        if(config.interceptors?.responseSuccessFn) {
          res = config.interceptors.responseSuccessFn(res)
        }
        this.showLoading = DEFAULT_LOADING
        resolve(res)
      }).catch((err) => {
        this.showLoading = DEFAULT_LOADING
        reject(err)
      })
    })
  }
  get<T = any>(config: DHRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'GET'})
  }
  post<T = any>(config: DHRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'POST'})
  }
  delete<T = any>(config: DHRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'DELETE'})
  }
  patch<T = any>(config: DHRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'PATCH'})
  }
  put<T = any>(config: DHRequestConfig<T>): Promise<T> {
    return this.request<T>({...config, method: 'PUT'})
  }
}

export default DHRequest
