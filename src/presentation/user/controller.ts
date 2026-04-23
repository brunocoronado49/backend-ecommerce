import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from '../../domain';
import { HandleErrorController } from '../../helpers';

export class AuthController {
  constructor(public readonly authService: AuthService) {}

  public registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .registerUser(registerUserDto!)
      .then(user => res.status(201).json(user))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);

    if (error) return res.status(400).json({ error });

    this.authService
      .loginUser(loginUserDto!)
      .then(user => res.status(200).json(user))
      .catch(error => HandleErrorController.handleError(error, res));
  };

  public validateEmail = (req: Request, res: Response) => {
    const { token } = req.params;

    this.authService
      .validateEmail(token as string)
      .then(() => res.status(200).json('Email validated successfully'))
      .catch(error => HandleErrorController.handleError(error, res));
  };
}
