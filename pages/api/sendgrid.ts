import type { NextApiRequest, NextApiResponse } from "next";
import sendgrid from "@sendgrid/mail";

import { validator } from "../../utils/validators";
import axios from "axios";
import { RecaptchaResponse } from "../../types/requests/recaptcha";
import { createMailBody } from "../../utils/createMailContent";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

const verifyRecaptcha = (token: string): Promise<RecaptchaResponse> =>
  axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
    )
    .then((response) => response.data);

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.title) return res.status(400).json("title is required");
  if (!req.body.content) return res.status(400).json("content is required");
  if (!req.body.email) return res.status(400).json("email is required");
  try {
    const verify = await verifyRecaptcha(req.body.recaptcha);

    if (verify.score < 0.5 || !verify.success)
      return res.status(400).json("wrong verify recaptcha");

    await sendgrid.send({
      to: "k.b.ziemski@gmail.com", // Your email where you'll receive emails
      from: "k.b.ziemski@gmail.com", // your website email address here
      subject: `[Wiadomość z Plushka.pl] : ${req.body.title}`,
      html: createMailBody({ ...req.body }),
    });

    return res.status(204).send("");
  } catch (error: any) {
    return res
      .status(
        "statusCode" in error && typeof error.statusCode === "number"
          ? error.statusCode
          : 500
      )
      .json({
        error: "message" in error ? error.message : "Unexpected error",
      });
  }

  return res.status(200).json({ error: "" });
}

export default sendEmail;
