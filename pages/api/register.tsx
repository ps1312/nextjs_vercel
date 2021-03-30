import type { NextApiRequest, NextApiResponse } from 'next'
import RegisterController from '../../server/controllers/RegisterController';
import PasswordMatchError from '../../server/errors/PasswordMatchError';
import MissingParamsValidator from '../../server/validators/MissingParamsValidator';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const requiredParams = ['email', 'password', 'passwordConfirmation']
  const validationResult = MissingParamsValidator.validate(req.body, requiredParams)
  if (validationResult !== undefined) {
    return res.status(400).json(validationResult)
  }

  if (req.body.password !== req.body.passwordConfirmation) {
    return res.status(400).json(new PasswordMatchError())
  }

  // const registerController  = new RegisterController()
  // const  user = registerController.process()
  // return res.status(201).json({ user })
};
