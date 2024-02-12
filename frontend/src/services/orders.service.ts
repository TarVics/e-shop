import {
  // I18nLocale,
  OrderPostType,
  OrderType,
  OrderQueryType,
  // ApiToken
} from "../interface";
// import {ordersData} from "../data";
import { apiConfig } from "../configs";
import { axiosService } from "./axios.service";
import { authService } from "./auth.service";
// import { AxiosHeaders } from "axios";

export const ordersService = {
  // orders: [] as Array<OrderType>,

  // async _loadOrders() {
  //   if (!this.orders.length) {
  //     const data: Array<OrderType> = [];
  //     for (let i = 0; i < ordersData.length; i++) {
  //       const item = ordersData[i];
  //       data.push({ ...item });
  //     }
  //     this.orders = data;
  //   }
  // },

  async createOrder(
    order: OrderPostType,
    params: OrderQueryType
  ): Promise<OrderType> {
    // await this._loadOrders();
    //
    // const result: OrderType = {
    //   ...order,
    //   id: String(this.orders.length + 1),
    //   createdAt: new Date().toJSON(),
    //   changedAt: new Date().toJSON()
    // };
    //
    // this.orders.push(result);
    //
    // return result;

    const token = authService.getAccessToken();
    const headers = token ? { "Authorization": `Bearer ${token}` } : undefined;

    const { data } = await axiosService.post<OrderType>(
      apiConfig.uri.orders(), order, { headers, params });

    return data;
  }
};
