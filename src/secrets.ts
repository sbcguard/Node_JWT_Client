import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
export const PORT = process.env.PORT;
// Parse SECURE_ROOT as a JSON array
export const SECURE_ROOT: string[] = JSON.parse(
  process.env.SECURE_ROOT! || '[]'
);
export const REDIRECT_LOGIN =
  process.env.REDIRECT_URL! + process.env.LOGIN_URI!;
export const REDIRECT_UNAUTHORIZED =
  process.env.REDIRECT_URL! + process.env.UNAUTHORIZED_URI!;
export const JWT_SECRET = process.env.JWT_SECRET!;
