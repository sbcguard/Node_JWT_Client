import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized';
import { ErrorCode } from '../exceptions/root';
import { user } from '@prisma/client';
import { setRedirectUrlCookie, validateToken, findUser } from '../utils';
import { REDIRECT_LOGIN } from '../secrets';
import { NotFoundException } from '../exceptions/notFound';

// Define a custom type extending the Request interface
interface AuthenticatedRequest extends Request {
  user?: user;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // 1. Get token from cookies
  const token = req.cookies.token || null;

  // 2. if no token, redirect to login page
  if (!token) {
    if (req.path !== '/login' && req.path !== '/signup') {
      setRedirectUrlCookie(
        res,
        `${req.protocol}://${req.get('host')}${req.originalUrl}`
      );
      return res.redirect(REDIRECT_LOGIN);
    }
    return next();
  }

  try {
    // 3. if token is present, verify token and extract payload
    const payload = validateToken(token);

    // 4. Get user from payload
    const user = await findUser({ id: payload.userId });
    if (!user) {
      return next(
        //also user not found error? user does not exist?
        new NotFoundException('User Not Found', ErrorCode.USER_NOT_FOUND)
      );
    }
    // 5. Attach the user to the current request object
    req.user = user;
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED));
  }
};

export default authMiddleware;
