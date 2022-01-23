import Exception from '../exception'
import { expect } from 'chai'

class MyException extends Exception {}
class MyError extends Error {}

export default function exceptionTest() {
  describe('Exception Recognition', () => {

    it ('Original Exception', () => {
      const err = new Exception('Exception')
      // noinspection SuspiciousTypeOfGuard
      expect(err instanceof Exception).to.equal(true)
    })

    it ('Custom Exception', () => {
      const err = new MyException('Custom Exception')
      // noinspection SuspiciousTypeOfGuard
      expect(err instanceof Exception).to.equal(true)
    })

    it ('Original Error', () => {
      const err = new Error('Error')
      expect(err instanceof Exception).to.equal(false)
    })

    it ('Original Error', () => {
      const err = new MyError('Custom Error')
      expect(err instanceof Exception).to.equal(false)
    })

  })
}