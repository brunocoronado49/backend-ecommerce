import { regularExps } from '../../../helpers';

export class RegisterUserDto {
  constructor(
    public readonly fullName: string,
    public username: string,
    public readonly email: string,
    public readonly password: string
  ) {}

  static register(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { fullName, username, email, password } = object;

    if (!fullName) return ['Missing full name'];
    if (!username) return ['Missing username'];

    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];

    if (!password) return ['Missing password'];
    if (password.length < 0) return ['Password too short'];

    return [undefined!, new RegisterUserDto(fullName, username, email, password)];
  }
}
