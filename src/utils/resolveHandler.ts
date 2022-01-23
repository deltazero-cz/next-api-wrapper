import { ApiRequest, ApiResponse, ApiMethods, ApiHandler } from '../types'
import Exception from '../exception'

export default function resolveHandler(methods: ApiMethods, req: ApiRequest, res: ApiResponse) : ApiHandler {

  // check for single provided function
  if (typeof methods === 'function')
    methods = { GET: methods }

  // @ts-ignore
  const handler = methods[req.method]

  if (typeof handler === 'undefined') {
    res?.setHeader('Allow', Object.keys(methods))
    throw new Exception(`Method ${req.method} Not Allowed`, 405)
  }

  return handler
}
