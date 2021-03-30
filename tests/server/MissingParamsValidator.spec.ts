import MissingParamError from "../../server/errors/MissingParamsError"
import MissingParamsValidator from "../../server/validators/MissingParamsValidator"

describe('MissingParamsValidator.ts', () => {
  it('should throw if body does not have all required params', () => {
    const requiredParams1 = ['param1', 'param2']
    const body1 = { param1: "value" }
    const result1 = MissingParamsValidator.validate(body1, requiredParams1)
    expect(result1).toEqual(new MissingParamError('param2'))

    const requiredParams2 = ['param1', 'param2']
    const body2 = {}
    const result2 = MissingParamsValidator.validate(body2, requiredParams2)
    expect(result2).toEqual(new MissingParamError('param1, param2'))

    const requiredParams3 = ['param1', 'param2']
    const body3 = { param1: 'value', param2: 'value' }
    const result3 = MissingParamsValidator.validate(body3, requiredParams3)
    expect(result3).toEqual(undefined)
  })
})

export { }