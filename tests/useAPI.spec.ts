import useAPI, { HTTPClient } from "../services/hooks/useAPI"

describe('useAPI.ts', () => {
  it('should return initial parameters', () => {
    const url = new URL('http://any-url.com')
    const client = new HTTPClientSpy()
    const [loading, data, error] = useAPI(url, client)

    expect(loading).toBeFalsy()
    expect(data).toBeUndefined()
    expect(error).toBeUndefined()
  })

  it('should make request with URL', () => {
    const url = new URL('http://any-url.com')
    const client = new HTTPClientSpy()
    const [_loading, _data, _error] = useAPI(url, client)

    expect(client.requestCount).toEqual(1)
    expect(client.requestedURL).toEqual(url)
  })

  class HTTPClientSpy implements HTTPClient {
    requestCount: number = 0
    requestedURL?: URL = undefined

    get(url: URL): void {
      this.requestCount++
      this.requestedURL = url
    }
  }
})
