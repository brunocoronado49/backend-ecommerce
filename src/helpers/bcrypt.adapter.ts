import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

// Adapter for bcryptjs, in case of change the lib for
// another method for crypt password
export const bcryptAdapter = {
  // Crypt the password
  hash: (password: string) => {
    const salt = genSaltSync();
    return hashSync(password, salt);
  },

  // Compare the password with password hashed
  compare: (password: string, hashed: string) => {
    return compareSync(password, hashed);
  },
};
