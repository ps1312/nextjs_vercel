import type { NextApiRequest, NextApiResponse } from 'next'
import Hello from '../../services/Class';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({});
};
