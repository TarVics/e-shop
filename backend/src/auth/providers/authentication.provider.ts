import argon2 from '@node-rs/argon2';

export class AuthenticationProvider {
  static async generateHash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  static async verifyHash(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
