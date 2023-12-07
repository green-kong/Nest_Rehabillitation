import { Product } from '../../domain/Product.entity';

export class ProductResponse {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    public static from(product: Product): ProductResponse {
        return new ProductResponse(product.getName(), product.getPrice());
    }
}
