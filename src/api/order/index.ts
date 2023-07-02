import { Request, Response, Router } from "express";
import { query, body } from "express-validator";
import { validate } from "../../middleware";
import { v4 as uuidv4 } from "uuid";
import OrderService from "../../order/orderService";
import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import { BODY_STATUS_CONDITIONS } from "../../constants/order";

export const orderRoutes = (orderService: OrderService) =>
    Router()
        .get(
            "/",
            [query("userId").optional().isString(), query("lastOrderId").optional().isString()],
            validate,
            async (req: Request, res: Response) => {
                const {
                    query: { userId, lastOrderId },
                } = req;
                const queryUserId: string = (userId as string) || "";
                const queryLastOrderId: string = (lastOrderId as string) || "";
                const result = await orderService.getAllOrders(queryUserId, queryLastOrderId);
                res.json(result);
            },
        )
        .post(
            "/",
            [
                body("deliveryAddress").isString().notEmpty(),
                body("items").isArray().notEmpty(),
                body("items.*.productId").isString().notEmpty(),
                body("items.*.quantity").isNumeric().notEmpty(),
                body("items.*.price").isNumeric().notEmpty(),
                body("items.*.currency").isString().notEmpty(),
                body("status").isString().isIn(BODY_STATUS_CONDITIONS),
                body("trackingCompany").optional().isString(),
                body("trackingNumber").optional().isString(),
                body("userId").isString().notEmpty(),
            ],
            validate,
            async (req: Request, res: Response) => {
                const { body } = req;
                const newOrder = {
                    ...body,
                    createdAt: Date.now(),
                    id: uuidv4(),
                    lastUpdatedAt: Date.now(),
                };
                const result = await orderService.createOrder(newOrder);
                res.status(HTTP_STATUS_CODES.CREATED).json(result);
            },
        )
        .put(
            "/",
            [
                body("createdAt").isNumeric().notEmpty(),
                body("deliveryAddress").isString().notEmpty(),
                body("id").isString().notEmpty(),
                body("items").isArray().notEmpty(),
                body("items.*.productId").isString().notEmpty(),
                body("items.*.quantity").isNumeric().notEmpty(),
                body("items.*.price").isNumeric().notEmpty(),
                body("items.*.currency").isString().notEmpty(),
                body("status").isString().isIn(BODY_STATUS_CONDITIONS),
                body("trackingCompany").optional().isString(),
                body("trackingNumber").optional().isString(),
                body("userId").isString().notEmpty(),
            ],
            validate,
            async (req: Request, res: Response) => {
                const { body } = req;
                const updatedOrder = {
                    ...body,
                    lastUpdatedAt: Date.now(),
                };
                const result = await orderService.updateOrder(updatedOrder);
                res.json(result);
            },
        );
