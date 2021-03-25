import type { NextApiRequest, NextApiResponse } from 'next'
import {getTodos, insertTodo} from '../../services/todos';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const todos = await getTodos()
    res.status(200).json({ todos });
  } else {
    const todo = await insertTodo(req.body)
    res.status(200).json({ ...todo });
  }
};
