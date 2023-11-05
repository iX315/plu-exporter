import { NextApiRequest, NextApiResponse } from "next";
import { authenticator } from "otplib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const methodIsPost = req.method === "POST";
  const totp = req.query.totp;

  if (!process.env.TOTP_SECRET || !totp || Array.isArray(totp)) {
    res.status(200).json({ message: "Not available" });
    return;
  }

  const totpIsCorrect = authenticator.check(totp, process.env.TOTP_SECRET);

  if (totpIsCorrect && methodIsPost) {
    res.status(200).json({ message: "Cache cleared" });
  }
  res.status(500).json({ message: "Not allowed" });
}
