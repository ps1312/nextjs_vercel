interface HTTPClient {
  get: (url: URL) => void
}

type useAPIResult = { loading: boolean, data?: any, error?: Error }

const useAPI = (url: URL, client: HTTPClient): useAPIResult => {
  client.get(url)
  return { loading: false, data: undefined, error: undefined }
}

export default useAPI
export type { HTTPClient, useAPIResult }
