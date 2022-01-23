import normalizeStatusMessage from "../utils/normalizeStatusMessage";
import { expect } from 'chai'

export default function normalizeStatusMessageTest() {
  describe('Status Message Normalizer', () => {
    const messages = [
        // latin strip diacritics
        ['Příliš žluťoučký kůň úpěl ďábelské ódy', 'Prilis zlutoucky kun upel dabelske ody'],

        // strip lines
        ['Two Line Error Message\nWith a Description on the 2nd Row', 'Two Line Error Message'],

        // non-latin strip all
        ['Нелатинский алфавит', ''],
        ['非拉丁字母', ''],

        // non-string objects
        [42, '42'],
        [{ object: true }, ''],
        [(() => null), ''],
    ]

    messages.map(([ original, normalized ]) =>

      it (`Normalize: "${original}" into "${normalized}"`, () => {
        // @ts-ignore
        expect(normalizeStatusMessage(original)).to.equal(normalized)
      }))

  })
}
