interface HTTPClient {
  get: () => void
}

type useAPIResult = [loading: boolean, data?: any, error?: Error]

const useAPI = (client: HTTPClient): useAPIResult => {
  return [false, undefined, undefined]
}

export default useAPI
export type { HTTPClient }
