import { CustomError } from '../errors/custom.error';

// User entity for use and send it to database
export class UserEntity {
  constructor(
    public id: string,
    public fullName: string,
    public username: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public img?: string
  ) {}

  // Transform the json response in UserEntity instance
  static fromObject(object: { [key: string]: any }) {
    const { id, _id, fullName, username, email, emailValidated, password, role, img } = object;

    if (!_id && !id) {
      throw CustomError.badRequest('Missing ID');
    }

    // Check if some data is missing
    if (!fullName) throw CustomError.badRequest('Missing full name');
    if (!username) throw CustomError.badRequest('Missing username');
    if (!email) throw CustomError.badRequest('Missing email');
    if (emailValidated === undefined) throw CustomError.badRequest('Missing email validated');
    if (!password) throw CustomError.badRequest('Missing password');
    if (!role) throw CustomError.badRequest('Missing role');

    return new UserEntity(
      _id || id,
      fullName,
      username,
      email,
      emailValidated,
      password,
      role,
      img
    );
  }
}
