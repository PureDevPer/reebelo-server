import { Request, Response, Router } from "express";
import { query, body } from "express-validator";
import { HTTP_STATUS_CODES } from "../../constants/httpStatusCodes";
import { validate } from "../../middleware";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import ProductService from "../../product/productService";

export const productRoutes = (prouctService: ProductService) =>
    Router()
        .get(
            "/",
            [
                query("brand").optional().isString(),
                query("id").optional().isString(),
                query("title").optional().isString(),
                query("lastProductTitle").optional().isString(),
            ],
            validate,
            async (req: Request, res: Response) => {
                const {
                    query: { brand, id, title, lastProductTitle },
                } = req;
                let queryKey: string = "";
                if (!_.isEmpty(brand)) {
                    queryKey = "brand";
                } else if (!_.isEmpty(id)) {
                    queryKey = "id";
                } else if (!_.isEmpty(title)) {
                    queryKey = "title";
                }

                const queryValue: string = (brand as string) || (id as string) || (title as string) || "";
                const queryLastProductTitle: string = (lastProductTitle as string) || "";
                const result = await prouctService.getAllProducts(queryKey, queryValue, queryLastProductTitle);
                res.json(result);
            },
        )
        .post(
            "/",
            [
                body("brand").isString().notEmpty(),
                body("category").isArray().notEmpty(),
                body("price").isNumeric().notEmpty(),
                body("quantity").isInt().notEmpty(),
                body("title").isString().notEmpty(),
            ],
            validate,
            async (req: Request, res: Response) => {
                const { body } = req;
                const newProduct = {
                    ...body,
                    createdAt: Date.now(),
                    id: uuidv4(),
                    lastUpdatedAt: Date.now(),
                };
                const result = await prouctService.createProduct(newProduct);
                res.status(HTTP_STATUS_CODES.CREATED).json(result);
            },
        );
