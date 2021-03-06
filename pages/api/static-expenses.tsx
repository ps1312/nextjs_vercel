import type { NextApiRequest, NextApiResponse } from 'next'

type Expense = {
  [id: string]: {
    amount: number;
    title: string;
    created_at: string;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const expenses = {
      "0B8FB609-39D8-4E6E-8F57-0DCBEBD23850": {
        amount: 99999.99,
        created_at: "2021-03-20T19:00:00+00:00",
        title: "move",
      },
      "1ACD6801-CDFA-4C11-9BA8-803A774EC49D": {
        amount: 19.9,
        created_at: "2021-03-19T00:11:00+00:00",
        title: "mc germes",
      }
    }
 
  return res.status(200).json({ ...expenses })
};
