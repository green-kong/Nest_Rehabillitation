import { Product } from '../../domain/Product.entity';

export class ProductCreateRequest {
    name: string;
    price: number;

    public static of(name: string, price: number) {
        const productCreateRequest = new ProductCreateRequest();
        productCreateRequest.name = name;
        productCreateRequest.price = price;
        return productCreateRequest;
    }

    public toProduct(): Product {
        return Product.of(this.name, this.price);
    }
}
