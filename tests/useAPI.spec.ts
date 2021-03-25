import useAPI, { HTTPClient } from "../services/hooks/useAPI"

describe('useAPI.ts', () => {
  it('should return initial parameters', () => {
    const client = new HTTPClientSpy()
    const [loading, data, error] = useAPI(client)

    expect(loading).toBeFalsy()
    expect(data).toBeUndefined()
    expect(error).toBeUndefined()
  })

  class HTTPClientSpy implements HTTPClient {
    get(): void {

    }
  }
})
