export default function normalizeStatusMessage(message: string) : string {
  if (!['string', 'number'].includes(typeof message))
    return ''

  return message
          ?.toString()
          .split('\n')[0]
          .normalize("NFD")
          .replace(/[^\w\s.,;:\[\]]/g, '')
          .trim()
      ?? ''
}
