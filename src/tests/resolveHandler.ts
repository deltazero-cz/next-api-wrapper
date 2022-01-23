import resolveHandler from '../utils/resolveHandler'
import { expect } from 'chai'

export default function resolveHandlerTest() {
  describe('Method Resolution', () => {
    let methods = {
      GET: 'hovno',
      PUT: () => 'hovno',
      DELETE: () => { throw 'STOP' }
    }

    it ('GET as string', () => {
      // @ts-ignore
      const handler = resolveHandler(methods, { method: 'GET' }, undefined)
      expect(handler).to.equal(methods.GET)
    })

    it ('PUT as function', () => {
      // @ts-ignore
      const handler = resolveHandler(methods, { method: 'PUT' }, undefined)
      expect(typeof handler).to.equal('function')
    })

    it ('DELETE as function', () => {
      // @ts-ignore
      const handler = resolveHandler(methods, { method: 'DELETE' }, undefined)
      expect(handler).to.throw()
    })

    it ('PATCH as error 405', () => {
      // @ts-ignore
      expect(() => resolveHandler(methods, { method: 'PATCH' }, undefined))
          .to.throw('Method PATCH Not Allowed')
    })

  })
}
