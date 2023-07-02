import _ from "lodash";
import ProductApiClient from "./productApiClient";
import { ProductReqBody } from "../interfaces/product";

export default class ProductService {
    private productApiClient: ProductApiClient;

    constructor(productApiClient: ProductApiClient) {
        this.productApiClient = productApiClient;
    }

    async getAllProducts(key: string, value: string, lastProductTitle: string) {
        return await this.productApiClient.requestGetProduct(key, value, lastProductTitle);
    }

    async createProduct(body: ProductReqBody) {
        const imgUrl: string = process.env.FIREBASE_NO_IMAGE_URL || "";
        await this.productApiClient.requestPostProduct({ ...body, imgUrl });
        return { ...body, imgUrl };
    }
}
