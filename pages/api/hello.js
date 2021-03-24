// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();

  res.status(200).json(data);
};
