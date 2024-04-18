import axios from 'axios'

const token = import.meta.env.VITE_MAL_TOKEN

if (!token)
  throw new Error('MYANILIST_TOKEN is not defined, please check .env file under root directory.')

const axiosInstance = axios.create({
  baseURL: 'https://cors-proxy.fringe.zone/https://api.myanimelist.net',
  // Solve CROS error caused by : https://myanimelist.net/forum/?topicid=1924562
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
export async function searchMALAnimeListAsync(params: { q: string; limit?: number }) {
  return axiosInstance({
    url: '/v2/anime',
    method: 'get',
    params: {
      q: params.q,
      limit: params.limit! | 10,
    },
  })
}
