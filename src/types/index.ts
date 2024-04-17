export interface BangumiSearchSubjectParams {
  type?: number
  responseGroup?: 'small' | 'medium' | 'large'
  max_results?: number
}

export interface BangumiSearchSubjectPostParams {
  limit?: number
  offset?: number
}

export interface BangumiSearchSubjectPostBody {
  keyword: string
  sort?: string
  filter?: BangumiSearchSubjectPostBodyFilter
}

interface BangumiSearchSubjectPostBodyFilter {
  type?: number[]
  tags?: string[]
  air_date?: string[]
  rating?: string[]
  rank?: string[]
  nsfw?: boolean
}
