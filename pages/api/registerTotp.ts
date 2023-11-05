import qrcode from "qrcode";
import { authenticator } from "@otplib/preset-default";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (process.env.NODE_ENV !== "development" || !process.env.TOTP_SECRET) {
    res.status(200).send("Not available");
    return;
  }
  const user = "plumanadmin";
  const service = "PLU manager";

  const otpauth = authenticator.keyuri(user, service, process.env.TOTP_SECRET);

  qrcode.toDataURL(otpauth, (err, imageUrl) => {
    if (err) {
      console.log("Error with QR");
      return;
    }
    res.status(200).send(`<body><img src="${imageUrl}" /></body>`);
  });
}
