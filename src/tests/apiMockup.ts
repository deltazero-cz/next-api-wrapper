import Wrapper from '../wrapper'
import Exception from '../Exception'
import { expect } from 'chai'

export default function apiMockup() {
  const res = new Response()

  describe('API mockup calls', () => {

    it ('GET simple', async () => {
      // @ts-ignore
      await handler({ method: 'GET', headers: [] }, res)

      expect(res.response).to.equal(JSON.stringify('simple result'))
    })

    it ('POST function', async () => {
      // @ts-ignore
      await handler({ method: 'POST', headers: [] }, res)
      expect(res.response).to.equal(JSON.stringify({
        insertId: 1
      }))
    })

    it ('PUT throws an Exception', async () => {
      // @ts-ignore
      await handler({ method: 'PUT', headers: [] }, res)
      expect(res.response).to.equal(JSON.stringify({
        message: 'Malformated Input',
        error: 400,
        data: { missing: [ 'name', 'content' ] }
      }))
    })

    it ('DELETE throws an Error', async () => {
      // @ts-ignore
      await handler({ method: 'DELETE', headers: [] }, res)
      expect(res.response).to.equal(JSON.stringify({
        message: 'Internal Server Error',
        error: 500
      }))
    })

    it ('PATCH throws an Exception', async () => {
      // @ts-ignore
      await handler({ method: 'PATCH', headers: [] }, res)
      expect(res.response).to.equal(JSON.stringify({
        message: 'Method PATCH Not Allowed',
        error: 405
      }))
    })

  })
}

const handler = Wrapper({
  GET: 'simple result',

  POST: async () => {
    await new Promise(resolve => setTimeout(resolve, 10))
    return { "insertId": 1 }
  },

  PUT: async () => { throw new Exception('Malformated Input', 400, { missing: ['name', 'content'] }) },

  DELETE: async () => { throw 'STOP' }
}, { errorLogger: null })

class Response {
  constructor() { this.response = '' }
  response: string
  // noinspection JSUnusedGlobalSymbols
  statusMessage?: string
  statusCode?: string

  send(input: string) { this.response = input }
  json(input: string) { this.response = JSON.stringify(input) }
  // noinspection JSUnusedLocalSymbols
  setHeader(key: string, val: string) {}
  getHeaders() { return {} }
}
