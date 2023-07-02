export interface OrderItem {
    currency: number;
    price: number;
    productId: string;
    quantity: number;
}

export interface OrderReqBody {
    deliveryAddress: string;
    items: OrderItem[];
    status: string;
    trackingCompany: string;
    trackingNumber: string;
    userId: string;
    createdAt: string;
    id: string;
    lastUpdatedAt: string;
}
