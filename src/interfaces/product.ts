export interface ProductReqBody {
    brand: string;
    category: string[];
    price: number;
    quantity: number;
    title: string;
    createdAt: string;
    id: string;
    lastUpdatedAt: string;
}

export interface ProductReqBodyWithURL extends ProductReqBody {
    imgUrl: string;
}
