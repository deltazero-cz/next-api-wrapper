import { NextApiRequest, NextApiResponse } from 'next/types'
import Exception from './exception'

export type ApiHandler<T = any> = (req ?: ApiRequest | undefined, res ?: ApiResponse) => ApiRequest | Promise<ApiResult>

export type ApiResult = ApiHandler | string | number | boolean | object

export type ApiMethods = {
  GET ?: ApiResult,
  POST ?: ApiResult,
  PUT ?: ApiResult,
  DELETE ?: ApiResult,
} | ApiRequest

export interface ApiRequest extends NextApiRequest {
  ip?: string
}

export type ApiResponse = NextApiResponse

export type WrapperOptions = {
  exceptionLogger ?: (e: Exception, req ?: ApiRequest, res ?: NextApiResponse) => void,
  errorLogger ?: ((e: Error | any, req ?: ApiRequest, res ?: NextApiResponse) => void) | null,
}
