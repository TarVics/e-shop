import {
  ApiToken,
  I18nLocale,
  JwtPairType,
  UserChangePasswordType,
  UserLoginType,
  UserRecoverPasswordType,
  UserRegisterType
} from "../interface";
import { axiosQuery } from "./axios.service";
import { apiConfig } from "../configs";
import { AxiosError, AxiosRequestConfig } from "axios";

const _makeHeader = (token: ApiToken): AxiosRequestConfig => {
  return {
    headers: { "Authorization": `Bearer ${token}` }
  };
}

export const authService = {

  onChange: undefined as ((jwtPair?: JwtPairType) => void) | undefined,

  deleteToken(): void {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    this.onChange && this.onChange();
  },

  getAccessToken(): string | undefined {
    return localStorage.getItem("access") || undefined;
  },

  getRefreshToken(): string | undefined {
    return localStorage.getItem("refresh") || undefined;
  },

  setTokens(jwtPair: JwtPairType): void {
    localStorage.setItem("access", jwtPair.accessToken);
    localStorage.setItem("refresh", jwtPair.refreshToken);
    this.onChange && this.onChange(jwtPair);
  },

  async login(user: UserLoginType): Promise<JwtPairType> {
    const { data } = await axiosQuery.post<JwtPairType>(
      apiConfig.uri.auth.login(), user);

    if (data) this.setTokens(data);

    return data;
  },

  async logout(accessToken: ApiToken): Promise<void> {
    try {
      await axiosQuery.post(
        apiConfig.uri.auth.logout(), undefined, _makeHeader(accessToken));
    } catch (e) {
      if (e instanceof AxiosError && (e as AxiosError).response?.status === 401) return;
      throw e;
    }
  },

  async changePassword(accessToken: ApiToken, data: UserChangePasswordType): Promise<void> {
    await axiosQuery.post(apiConfig.uri.auth.password(), data, _makeHeader(accessToken));
  },

  async recover(user: UserRecoverPasswordType, lang: I18nLocale): Promise<void> {
    await axiosQuery.post(apiConfig.uri.auth.recover.register(lang), user);
  },

  async recoverConfirm(recoverToken: ApiToken, user: UserLoginType): Promise<JwtPairType> {
    const { data } = await axiosQuery.post<JwtPairType>(
      apiConfig.uri.auth.recover.confirm(), user, _makeHeader(recoverToken));

    if (data) this.setTokens(data);

    return data;
  },

  async refreshToken(refreshToken: ApiToken): Promise<JwtPairType> {
    const { data } = await axiosQuery.post<JwtPairType>(
      apiConfig.uri.auth.refresh(), undefined, _makeHeader(refreshToken));

    if (data) this.setTokens(data);

    return data;
  },

  async signIn(user: UserRegisterType, lang: I18nLocale): Promise<void> {
    await axiosQuery.post(apiConfig.uri.auth.signIn.register(lang), user);
  },

  async signInConfirm(signInToken: ApiToken): Promise<JwtPairType> {
    const { data } = await axiosQuery.post<JwtPairType>(
      apiConfig.uri.auth.signIn.confirm(), undefined, _makeHeader(signInToken));

    if (data) this.setTokens(data);

    return data;
  }

};