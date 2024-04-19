import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: {
    isAdmin: boolean;
  };
}
function isAdminMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
  const isAdmin: boolean = req.user?.isAdmin;
  if (isAdmin) {
    next();
  } else {

    return res.status(403).json({ error: 'Acceso no autorizado' });
  }
}

export default isAdminMiddleware;
