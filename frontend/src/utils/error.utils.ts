import { I18nDescription } from "../data";
import { AxiosError } from "axios";

const writeArray = (message: any) => {
  if (Array.isArray(message)) {
    const arr = message as Array<string>;
    return (arr.length === 1) ?
      arr[0] :
      arr.map((val, index) => (index + 1) + ". " + val).join("; ")
  } else {
    return message;
  }
};

export const getErrorMessage = (i18n: I18nDescription, e?: Record<any, any>): string => {
  if (!e) return "";
  if (e.name === "AxiosError") {
    return e.status ?
      e.status === 401 ? i18n.value.ERR_UNAUTHORIZED : writeArray(e.message)
      : i18n.value.ERR_CONNECTION;
  } else {
    return writeArray(e.message);
  }
};

export const getErrorObject = (e: Error): Record<any, any> => {
  if (e instanceof AxiosError) {
    const error = (e as AxiosError);
    const data = error.response?.data as any;
    const message = data?.message ? data?.message : error.message;
    return {
      name: error.name,
      message,
      // stack: error.stack,
      status: error.response?.status,
      statusText: error.response?.statusText,
      code: error.code
    };
  } else {
    const error = (e as Error);
    return { name: error.name, message: error.message/*, stack: error.stack*/ };
  }
};

export const makeErrorObject = (message: string, name: string = ""): Record<any, any> => {
  return { name, message };
};
