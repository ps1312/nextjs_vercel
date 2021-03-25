import useAPI, { HTTPClient, useAPIResult } from "../services/hooks/useAPI"

describe('useAPI.ts', () => {
  it('should return initial parameters', () => {
    const [_client, sut] = makeSUT()

    expect(sut.loading).toBeFalsy()
    expect(sut.data).toBeUndefined()
    expect(sut.error).toBeUndefined()
  })

  it('should make request with URL', () => {
    const url = new URL('http://another-url.com')
    const [client, _sut] = makeSUT(url)

    expect(client.requestCount).toEqual(1)
    expect(client.requestedURL).toEqual(url)
  })

  const makeSUT = (url: URL = new URL('http://any-url.com')): [HTTPClientSpy, useAPIResult] => {
    const client = new HTTPClientSpy()
    const sut = useAPI(url, client)

    return [client, sut]
  }

  class HTTPClientSpy implements HTTPClient {
    requestCount: number = 0
    requestedURL?: URL = undefined

    get(url: URL): void {
      this.requestCount++
      this.requestedURL = url
    }
  }
})
