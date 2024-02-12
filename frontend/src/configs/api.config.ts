import { ApiUid, I18nLocale } from "../interface";

type IApiConfigType = {
  config: {
    baseURL: string,
    headers: object
  },
  uri: {
    auth: {
      signIn: {
        register: (lang: I18nLocale) => string,
        confirm: () => string
      },
      recover: {
        register: (lang: I18nLocale) => string,
        confirm: () => string
      },
      login: () => string,
      logout: () => string,
      forget: () => string,
      password: () => string,
      refresh: () => string,
    },
    carts: (props: { uid?: ApiUid, lang: I18nLocale }) => string,
    categoryBanners: (name: string) => string,
    collectionBanners: (name: string) => string,
    orders: () => string,
    products: (uid?: ApiUid) => string,
    productImages: (name: string) => string,
    profile: () => string,
    refs: string,
    reviews: () => string,
  }
}

const apiConfig: IApiConfigType = {
  config: {
    baseURL: process.env.REACT_APP_API || "",
    headers: {
      // "Content-type": "application/json; charset=UTF-8"
      "Access-Control-Allow-Origin": "*"
    }
  },
  uri: {
    auth: {
      signIn: {
        register: (lang: I18nLocale) => `/auth/register?lang=${lang}`,
        confirm: () => "/auth/register/confirm"
      },
      recover: {
        register: (lang: I18nLocale) => `/auth/recover?lang=${lang}`,
        confirm: () => "/auth/recover/confirm"
      },
      login: () => "/auth/login",
      logout: () => "/auth/logout",
      forget: () => "/auth/password",
      password: () => "/auth/password",
      refresh: () => "/auth/refresh"
    },
    carts: ({ uid, lang }) => `/carts${uid ? "/" + uid : ""}?lang=${lang}`,
    categoryBanners: name => `/refs/categories/banners/${name}`,
    collectionBanners: name => `/refs/collections/banners/${name}`,
    orders: () => "/orders",
    products: (uid?: ApiUid) => uid ? `/products/${uid}` : "/products",
    productImages: name => `/products/images/${name}`,
    profile: () => "/profile",
    refs: "/refs",
    reviews: () => "/reviews"
  }
};

export { apiConfig };