import jwt from 'jsonwebtoken';
import { envs } from '../config/envs';

const JWT_SEED: string = envs.JWT_SEED;

// Adapter for Json Web Token, here we can change the dependency if need it
export class JwtAdapter {
  // This method generate the token based on a payload with duration of 2 hours
  static async generateToken(payload: any, duration: any = '2h') {
    return new Promise(resolve => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) return resolve(null);

        resolve(token);
      });
    });
  }

  // Validate if token is valid using the seed
  static validateToken<T>(token: string): Promise<T | null> {
    return new Promise(resolve => {
      jwt.verify(token, JWT_SEED, (error, decoded) => {
        if (error) return resolve(null);

        resolve(decoded as T);
      });
    });
  }
}
