import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';

export const validateToken = (token: string) =>
  jwt.verify(token, JWT_SECRET) as { userId: number };
