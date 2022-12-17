export interface RecaptchaResponse {
  success: boolean;
  challenge_ts: string; //date;
  hostname: string;
  score: number; //0-1;
  action: string;
}
