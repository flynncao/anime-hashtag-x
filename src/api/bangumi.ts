import axios from 'axios'
import type { BangumiSearchSubjectParams, BangumiSearchSubjectPostBody, BangumiSearchSubjectPostParams } from '../types/index'
import { handleAxiosError, handleUnexpectedError } from '~/utils/error'

const axiosInstance = axios.create({
  baseURL: 'https://api.bgm.tv',
  headers: {
    'Authorization': 'Bearer ' + 'D8pe0j00S0RBlZxpZ5JtO5ZUmaQZwT4cybuTsxGQ',
    'Content-Type': 'application/json;charset=utf-8',
  },
})

axiosInstance.interceptors.request.use((config) => {
  return config
})
export async function searchBangumiSubjectAsync(keyword: string, params: BangumiSearchSubjectParams) {
  return axiosInstance.get(`v0/search/subject/${keyword}`,
    {
      params: {
        type: params.type,
        responseGroup: params.responseGroup,
        max_results: params.max_results,
      },
    }).catch((error) => {
    if (axios.isAxiosError(error))
      handleAxiosError(error)
    else
      handleUnexpectedError(error)
  })
}

export async function searchBangumiSubjectAsyncPost(params: BangumiSearchSubjectPostParams, body: BangumiSearchSubjectPostBody) {
  return axiosInstance({
    method: 'post',
    url: '/v0/search/subjects',
    data: body,
    params: {
      limit: params.limit,
      offset: params.offset,
    },
  }).catch((error) => {
    if (axios.isAxiosError(error))
      handleAxiosError(error)
    else
      handleUnexpectedError(error)
  })
}
