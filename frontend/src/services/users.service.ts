import { ApiToken, UserType } from "../interface";
import { axiosService } from "./axios.service";
import { apiConfig } from "../configs";
import { AxiosRequestConfig } from "axios";

export const usersService = {

  _makeHeader(token: ApiToken): AxiosRequestConfig {
    return {
      headers: { "Authorization": `Bearer ${token}` }
    };
  },

  async getProfile(accessToken: ApiToken): Promise<UserType> {
    const { data } = await axiosService.get<UserType>(
      apiConfig.uri.profile(), this._makeHeader(accessToken));

    return data;
  },

  async setProfile(user: UserType, accessToken: ApiToken): Promise<UserType> {
    const { data } = await axiosService.post<UserType>(
      apiConfig.uri.profile(), user, this._makeHeader(accessToken));

    return data;
  }

};
