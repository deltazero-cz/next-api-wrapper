import type { NextApiRequest } from 'next/types'

export default function parseIP(req : NextApiRequest) {
  return (
      (typeof req.headers['x-forwarded-for'] === 'string' && req.headers['x-forwarded-for'].split(',').shift())
      || req.socket?.remoteAddress
  )
}
