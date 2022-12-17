import axios from "axios";
import { ContactMessage } from "../types/message";

export const sendMessage = async (
  payload: ContactMessage,
  recaptcha: string
) => {
  axios.post("api/sendgrid", { ...payload, recaptcha });
};
