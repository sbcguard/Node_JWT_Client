import { Response } from 'express';
export const setRedirectUrlCookie = (res: Response, redirectUrl: string) => {
  res.cookie('redirectUrl', redirectUrl, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    secure: true, // Use `secure` flag in production
    sameSite: 'strict', // Controls cookie sending in cross-site requests
    path: '/', // Ensure the cookie is sent with requests to all paths
    maxAge: 12 * 60 * 60 * 1000, // 12 hours in milliseconds
  });
};
