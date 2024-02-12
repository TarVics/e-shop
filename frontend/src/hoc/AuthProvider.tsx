import { createContext, FC, PropsWithChildren, useMemo, useState } from "react";

import { authService, usersService } from "../services";
import {
  ApiToken,
  I18nLocale,
  JwtPairType, UserChangePasswordType,
  UserLoginType,
  UserRecoverPasswordType,
  UserRegisterType, UserType
} from "../interface";
import { getErrorObject, makeErrorObject } from "../utils";

export interface AuthContextState {
  error: object;
  user: UserType;
  token: ApiToken;
}

const initialState: () => Partial<AuthContextState> = () => ({
  token: authService.getAccessToken()
});

export interface AuthContextApi {
  reset: (error?: string) => void;
  resetError: (error?: string) => void;
  signIn: (user: UserRegisterType, lang: I18nLocale) => Promise<boolean>;
  signInConfirm: (signInToken: ApiToken) => Promise<boolean>;
  recover: (user: UserRecoverPasswordType, lang: I18nLocale) => Promise<boolean>;
  recoverConfirm: (recoverToken: ApiToken, user: UserLoginType) => Promise<boolean>;
  login: (user: UserLoginType) => Promise<boolean>;
  logout: () => Promise<boolean>;
  changePassword: (data: UserChangePasswordType) => Promise<boolean>;
  loadProfile: () => Promise<boolean>;
  saveProfile: (profile: UserType) => Promise<boolean>;
}

export interface AuthContextData {
  ctx: Partial<AuthContextState>;
  api: AuthContextApi;
}

const AuthContext = createContext<AuthContextData>(undefined as never);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {

  const [ctx, setCtx] = useState(initialState);

  const api = useMemo(() => {

    const setData = (data: Partial<AuthContextState>) =>
      setCtx(prevState => ({
          ...prevState, ...data, error: data.error
        })
      );

    authService.onChange = (jwtPair?: JwtPairType) =>
      setData({ token: jwtPair?.accessToken });

    const tryCatch = async (func: () => Promise<Partial<AuthContextState> | null>) => {
      try {
        const data = await func();
        data && setData(data);
        return !data || !data.error;
      } catch (e) {
        setData({ error: getErrorObject(e as Error) });
        return false;
      }
    };

    const runAuth = (func: (accessToken: ApiToken) => Promise<Partial<AuthContextState> | null>) =>
      tryCatch(async () => {
        if (ctx.token) {
          const data = await func(ctx.token);
          return { ...data, error: undefined };
        } else {
          return { error: makeErrorObject("User is not Unauthorized") };
        }
      });

    const resetError = (error?: string) =>
      setData(error ? { error: makeErrorObject(error) } : {});

    const reset = (error?: string) => {
      resetError(error);
      authService.deleteToken();
    };

    const signIn = (user: UserRegisterType, lang: I18nLocale) =>
      tryCatch(async () => {
        await authService.signIn(user, lang);
        return {};
      });

    const signInConfirm = async (signInToken: ApiToken) =>
      tryCatch(async () => {
        const { accessToken } = await authService.signInConfirm(signInToken);
        return { token: accessToken };
      });

    const recover = (user: UserRecoverPasswordType, lang: I18nLocale) =>
      tryCatch(async () => {
        await authService.recover(user, lang);
        return {};
      });

    const recoverConfirm = async (recoverToken: ApiToken, user: UserLoginType) =>
      tryCatch(async () => {
        const { accessToken } = await authService.recoverConfirm(recoverToken, user);
        return { token: accessToken };
      });

    const login = async (user: UserLoginType) =>
      tryCatch(async () => {
        const { accessToken } = await authService.login(user);
        return { token: accessToken };
      });

    const logout = async () =>
      runAuth(async (accessToken: ApiToken) => {
        await authService.logout(accessToken);
        reset();
        return null;
      });

    const changePassword = async (data: UserChangePasswordType) =>
      runAuth(async (accessToken: ApiToken) => {
        await authService.changePassword(accessToken, data);
        return {};
      });

    const loadProfile = async () =>
      runAuth(async (accessToken: ApiToken) => {
        const user = await usersService.getProfile(accessToken);
        return { user };
      });

    const saveProfile = (profile: UserType) =>
      runAuth(async (accessToken: ApiToken) => {
        const user = await usersService.setProfile(profile, accessToken);
        return { user };
      });

    return {
      reset,
      resetError,
      signIn,
      signInConfirm,
      recover,
      recoverConfirm,
      login,
      logout,
      changePassword,
      loadProfile,
      saveProfile
    };

  }, [ctx.token]);

  return (
    <AuthContext.Provider value={{ ctx, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };