export interface Cart {
    userId: string;
    items: { productId: string, qty: number }[];
}