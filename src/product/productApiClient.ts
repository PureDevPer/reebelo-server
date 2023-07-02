import { dbService } from "../firebase";
import {
    doc,
    setDoc,
    collection,
    getDocs,
    query,
    where,
    Query,
    DocumentData,
    orderBy,
    limit,
    startAfter,
} from "firebase/firestore";
import dotenv from "dotenv";
import { ProductReqBodyWithURL } from "../interfaces/product";
import _ from "lodash";

dotenv.config();

export default class ProductApiClient {
    private firebaseCollection: string;

    constructor() {
        this.firebaseCollection = process.env.FIREBASE_PRODUCT_COLLECTION || "";
    }

    async requestGetProduct(key: string, value: string, lastProductTitle: string) {
        try {
            const products: Array<Object> = [];
            const customQuery: Query<DocumentData> =
                key?.length > 0 && value?.length > 0
                    ? query(
                          collection(dbService, this.firebaseCollection),
                          where(key, "==", value),
                          orderBy("title", "asc"),
                          startAfter(lastProductTitle),
                          limit(2),
                      )
                    : query(
                          collection(dbService, this.firebaseCollection),
                          orderBy("title", "asc"),
                          startAfter(lastProductTitle),
                          limit(2),
                      );

            const querySnapshot = await getDocs(customQuery);
            querySnapshot.forEach((q) => {
                products.push(q.data());
            });

            return products;
        } catch (error) {
            return error;
        }
    }

    async requestPostProduct(body: ProductReqBodyWithURL) {
        try {
            const productDoc = doc(dbService, `${this.firebaseCollection}/${body.title}`);
            await setDoc(productDoc, body, { merge: true });
        } catch (error) {
            return error;
        }
    }
}
