import { Router } from "express";
import ProductApiClient from "../product/productApiClient";
import ProductService from "../product/productService";
import { productRoutes } from "./product";
import OrderApiClient from "../order/orderApiClient";
import OrderService from "../order/orderService";
import { orderRoutes } from "./order";

const productApiClient: ProductApiClient = new ProductApiClient();
const productService: ProductService = new ProductService(productApiClient);

const orderApiClient: OrderApiClient = new OrderApiClient();
const orderService: OrderService = new OrderService(orderApiClient);

export const api = () =>
    Router().use("/product", productRoutes(productService)).use("/order", orderRoutes(orderService));
