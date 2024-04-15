import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'

const axiosInstance = axios.create()

export async function fetcher(url?: string, config?: AxiosRequestConfig) {
  const axiosConfig: AxiosRequestConfig = config || {
    method: 'GET',
    url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    },
  }
  const getters = await axiosInstance.request(axiosConfig)
  return Promise.resolve(getters)
}
export default fetcher
