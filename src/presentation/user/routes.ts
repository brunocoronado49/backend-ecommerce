import { Router } from 'express';
import { EmailService } from './email.service';
import { envs } from '../../config/envs';
import { AuthService } from './auth.service';
import { AuthController } from './controller';

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService: EmailService = new EmailService(
      {
        mailerService: envs.MAILER_SERVICE,
        mailerEmail: envs.MAILER_EMAIL,
        mailerSecretKey: envs.MAILER_SECRET_KEY,
      },
      envs.SEND_EMAIL
    );
    const authService: AuthService = new AuthService(emailService);
    const authController: AuthController = new AuthController(authService);

    router.post('/login', authController.loginUser);
    router.post('/register', authController.registerUser);
    router.get('/validate-email/:token', authController.validateEmail);

    return router;
  }
}
