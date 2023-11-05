import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const methodIsPost = req.method === "POST";
  const { secret } = JSON.parse(req.body);

  if (!process.env.CACHE_SECRET || !secret || Array.isArray(secret)) {
    res.status(200).json({ message: "Not available" });
    return;
  }

  const secretIsCorrect = process.env.TOTP_SECRET === secret;

  if (secretIsCorrect && methodIsPost) {
    res.status(200).json({ message: "Cache cleared" });
  }
  res.status(500).json({ message: "Not allowed" });
}
