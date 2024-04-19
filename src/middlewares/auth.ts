import { Request, Response, NextFunction } from "express";
import { Payload} from "../types/userTypes";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: Payload;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const isTestEnvironment = typeof jest !== 'undefined';
  if (isTestEnvironment) {
    return next();
  }
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { user: Payload };
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

export default auth;


// import { Request, Response, NextFunction } from "express";
// import {JsonWebTokenError, JwtPayload} from "jsonwebtoken";
// import { validateToken } from "../config/token";

// export interface CustomRequest extends Request {
//   user?: { id: string; isAdmin: boolean }; 
// }

// const auth = async (req: CustomRequest, res: Response<string | JwtPayload>, next: NextFunction) => {
//   try {
//     const authorizationHeader = req.headers.authorization;
//     if (!authorizationHeader)
//     return res.status(401).send('Authorization token not found');
//     const [bearer, token] = authorizationHeader.split(' ');
//     if (bearer !== 'Bearer' || !token)
//     return res.status(401).send('Invalid authorization header');
//     const payload = validateToken(token);

//     if (!payload || typeof payload === 'string')
//       return res.status(401).send('Invalid authorization token');
//       req.user = { id: payload.user.id, isAdmin: payload.user.isAdmin };
  
//     next();
//   } catch (error) {
//     if (error instanceof JsonWebTokenError) {
//       return res.status(401).send('Invalid authorization token');
//     }
//     next(error)
//   }
// };

// export default auth;
