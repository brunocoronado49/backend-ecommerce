import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../helpers';
import { UserModel } from '../../data';
import { UserEntity } from '../../domain';

export class AuthMiddleware {
  public static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization: string | undefined = req.header('Authorization');
    if (!authorization) throw res.status(401).json({ error: 'Not token provider' });

    if (!authorization.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const token: string = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.validateToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: 'Invalid token' });

      const user = await UserModel.findById(payload.id);
      if (!user) return res.status(401).json({ error: 'Invalid token/user' });

      (req as any).user = UserEntity.fromObject(user);

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public static async isSeller(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;

    if (!user) return res.status(500).json({ error: 'Internal server error: user not found' });

    if (!user.role.includes('SELLER_ROLE')) {
      return res.status(401).json({ error: 'User is not authorized to perform this action' });
    }

    next();
  }
}
