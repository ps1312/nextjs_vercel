import type { NextApiRequest, NextApiResponse } from 'next'
import RegisterController from '../../server/controllers/RegisterController';
import PasswordMatchError from '../../server/errors/PasswordMatchError';
import InMemoryUserStore from '../../server/store/InMemoryUserStore';
import MissingParamsValidator from '../../server/validators/MissingParamsValidator';

const inMemoryUserStore = new InMemoryUserStore()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const requiredParams = ['email', 'password', 'passwordConfirmation']
  const validationResult = MissingParamsValidator.validate(req.body, requiredParams)
  if (validationResult !== undefined) {
    return res.status(400).json(validationResult)
  }

  if (req.body.password !== req.body.passwordConfirmation) {
    return res.status(400).json(new PasswordMatchError())
  }

  const registerController  = new RegisterController(inMemoryUserStore)
  const  user = registerController.process(req.body)
  return res.status(201).json({ user })
};
