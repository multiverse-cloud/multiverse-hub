declare module 'mammoth/mammoth.browser' {
  export type MammothRawTextResult = {
    value?: string
  }

  export function extractRawText(input: {
    arrayBuffer: ArrayBuffer
  }): Promise<MammothRawTextResult>

  const mammoth: {
    extractRawText: typeof extractRawText
  }

  export default mammoth
}
