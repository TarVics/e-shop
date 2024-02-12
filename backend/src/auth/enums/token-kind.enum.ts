export enum AuthTokenKind {
  Recover = 'recover',
  Register = 'register',
}

export enum JwtTokenKind {
  Access = 'access',
  Recover = 'recover',
  Refresh = 'refresh',
  Register = 'register',
}

export const TokenKind = { ...AuthTokenKind, ...JwtTokenKind } as const;
export type TokenKind = AuthTokenKind | JwtTokenKind;
// export type TokenKind = typeof TokenKind;
