export interface ApiErrorResponse {
  code: number
  message: string
}

export interface MetaDataType {
  totalCount: number
  totalPages: number
}

export interface ApiBasicResponse {
  code: number
  message: string
}

export interface ApiResponse<T> {
  code: number
  message: string
  result: T
  metaData: MetaDataType
}

export interface ApiResponseNotMetadata<T> {
  code: number
  message: string
  result: T
}

export interface ApiDeleteResponse {
  code: number
  message: string
  result: string
}

export interface ApiErrors {
  data: ApiErrorResponse
}
