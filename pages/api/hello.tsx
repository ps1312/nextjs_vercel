import type { NextApiRequest, NextApiResponse } from 'next'
import Hello from '../../services/Class';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const hello = new Hello()

  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();

  res.status(200).json(data);
};
