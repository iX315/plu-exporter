import { NextApiRequest, NextApiResponse } from "next";
import { isCorrectSecret, isProd } from "../../utils/env";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret } = JSON.parse(req.body);

  if (!process.env.CACHE_SECRET || !secret || Array.isArray(secret)) {
    res.status(200).json({ message: "Not available" });
    return;
  }

  const methodIsCorrect = req.method === (isProd() ? "POST" : "GET");

  if (isCorrectSecret(secret) && methodIsCorrect) {
    res.status(200).json({ message: "Cache cleared" });
  }
  res.status(500).json({ message: "Not allowed" });
}
