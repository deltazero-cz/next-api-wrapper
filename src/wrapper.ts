import Exception from './exception'
import parseIP from './utils/parseIP'
import { NextApiHandler } from 'next/types'
import type { ApiRequest, ApiResponse, ApiMethods, WrapperOptions } from './types'
import resolveHandler from "./utils/resolveHandler"
import normalizeStatusMessage from "./utils/normalizeStatusMessage";

export default function Wrapper(methods : ApiMethods, options ?: WrapperOptions) : NextApiHandler {
  return async (req : ApiRequest, res : ApiResponse) => {
    req.ip ??= parseIP(req)

    try {
      const handler = resolveHandler(methods, req, res)
      const output = typeof handler === 'function'
          ? await handler(req, res)
          : handler

      // stop if response is alredy sent
      if (res.writableEnded)
        return

      // send response
      if (!res.getHeaders()?.['Content-Type'])
        res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.send(JSON.stringify(output))

    } catch (e: Exception | Error | any) {
      // response for Exception
      if (e instanceof Exception || e?.isApiException) {
        const { message, statusCode, data } = e
        res.statusMessage = normalizeStatusMessage(message)
        res.statusCode = Math.max(400, Math.min(499, statusCode)) ?? 400
        res.json({
          message,
          error: res.statusCode,
          data
        })

        options?.errorLogger?.(e, req, res)

      // response for Error
      } else {
        res.statusMessage = 'Internal Server Error'
        res.statusCode = 500
        res.json({
          message: res.statusMessage,
          error: res.statusCode
        })

        typeof options?.errorLogger !== 'undefined'
          ? options.errorLogger?.(e, req, res)
          : console.warn(e)
      }
    }
  }
}
