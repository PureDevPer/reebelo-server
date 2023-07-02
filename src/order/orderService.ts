import { OrderReqBody } from "../interfaces/order";
import OrderApiClient from "./orderApiClient";

export default class OrderService {
    private orderApiClient: OrderApiClient;

    constructor(orderApiClient: OrderApiClient) {
        this.orderApiClient = orderApiClient;
    }

    async getAllOrders(userId: string, lastOrderId: string) {
        return await this.orderApiClient.requestGetOrder(userId, lastOrderId);
    }

    async createOrder(body: OrderReqBody) {
        await this.orderApiClient.requestPostOrder(body);
        return body;
    }

    async updateOrder(body: OrderReqBody) {
        await this.orderApiClient.requestPutOrder(body);
        return body;
    }
}
