import dotenv from "dotenv";
import {
    DocumentData,
    Query,
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    startAfter,
    where,
} from "firebase/firestore";
import { dbService } from "../firebase";
import { OrderReqBody } from "../interfaces/order";

dotenv.config();

export default class OrderApiClient {
    private firebaseCollection: string;

    constructor() {
        this.firebaseCollection = process.env.FIREBASE_ORDER_COLLECTION || "";
    }

    async requestGetOrder(userId: string, lastOrderId: string) {
        try {
            const order: Array<object> = [];
            const customQuery: Query<DocumentData> =
                userId?.length > 0
                    ? query(
                          collection(dbService, this.firebaseCollection),
                          where("userId", "==", userId),
                          orderBy("id", "asc"),
                          startAfter(lastOrderId),
                          limit(2),
                      )
                    : query(
                          collection(dbService, this.firebaseCollection),
                          orderBy("id", "asc"),
                          startAfter(lastOrderId),
                          limit(2),
                      );

            const querySnapshot = await getDocs(customQuery);
            querySnapshot.forEach((q) => {
                order.push(q.data());
            });
            return order;
        } catch (error) {
            return error;
        }
    }

    async requestPostOrder(body: OrderReqBody) {
        try {
            const orderDoc = doc(dbService, `${this.firebaseCollection}/${body.id}`);
            await setDoc(orderDoc, body, { merge: false });
        } catch (error) {
            return error;
        }
    }

    async requestPutOrder(body: OrderReqBody) {
        try {
            const orderDoc = doc(dbService, `${this.firebaseCollection}/${body.id}`);
            await setDoc(orderDoc, body, { merge: true });
        } catch (error) {
            return error;
        }
    }
}
