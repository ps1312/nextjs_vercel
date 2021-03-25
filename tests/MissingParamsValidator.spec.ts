import MissingParamsValidator, { MissingParamError } from "../validators/MissingParamsValidator"

describe('MissingParamsValidator.ts', () => {
  it('should throw if body does not have all required params', () => {
    const requiredParams1 = ['param1', 'param2']
    const body1 = { param1: "value" }

    expect(() => {
      MissingParamsValidator.validate(body1, requiredParams1)
    }).toThrow(new MissingParamError('param2'))

    const requiredParams2 = ['param1', 'param2']
    const body2 = {}
    expect(() => {
      MissingParamsValidator.validate(body2, requiredParams2)
    }).toThrow(new MissingParamError('param1, param2'))

    const requiredParams3 = ['param1', 'param2']
    const body3 = { param1: 'value', param2: 'value' }
    expect(() => {
      MissingParamsValidator.validate(body3, requiredParams3)
    }).not.toThrow()

  })
})

export { }