import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import { apiConfig } from "../configs";
import { authService } from "./auth.service";
import { router } from "../hoc";
import { uriService } from "./uri.service";

export type AsyncAxiosResponse<T> = Promise<AxiosResponse<T>>

const axiosService = axios.create(apiConfig.config as AxiosRequestConfig);
const axiosQuery = axios.create(apiConfig.config as AxiosRequestConfig);

axiosService.interceptors.request.use(
  async config => {
    const access = authService.getAccessToken();

    if (access && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${access}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axiosService.interceptors.response.use((config) => {
    return config;
  },
  async (error) => {
    const config = error?.config;
    const refresh = authService.getRefreshToken();

    if (error?.response?.status === 401 && refresh && !config._retry) {
      config._retry = true;
      try {
        const data = await authService.refreshToken(refresh);
        if (data?.accessToken) {
          config.headers = {
            ...config.headers,
            authorization: `Bearer ${data?.accessToken}`
          };
        }
      } catch (e) {
        await router.navigate(uriService.uriLogin(true), { replace: true });
        return Promise.reject(error);
      } finally {
        config._retry = false;
      }

      return axiosService(config);
    }

    return Promise.reject(error);
  }
);

export {
  axiosQuery,
  axiosService
};
