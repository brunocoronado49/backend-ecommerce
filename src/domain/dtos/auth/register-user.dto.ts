import { regularExps } from '../../../helpers';

export class RegisterUserDto {
  constructor(
    public readonly fullName: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: string[]
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { fullName, username, email, password, role = ['USER_ROLE'] } = object;

    if (!fullName) return ['Missing full name'];
    if (!username) return ['Missing username'];

    if (!email) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];

    if (!password) return ['Missing password'];
    if (password.length < 6) return ['Password too short'];

    if (!Array.isArray(role)) return ['Role must be an array of strings'];

    return [undefined!, new RegisterUserDto(fullName, username, email, password, role)];
  }
}
