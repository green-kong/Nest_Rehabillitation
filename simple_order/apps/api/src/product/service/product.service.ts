import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../domain/Product.repository';
import { ProductCreateRequest } from '../controller/dto/productCreateRequest';
import { ProductResponse } from '../controller/dto/productResponse';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async saveProduct(productCreateRequest: ProductCreateRequest) {
        const product = productCreateRequest.toProduct();
        const savedProduct = await this.productRepository.save(product);
        return savedProduct.id;
    }

    async findProduct(id: number) {
        const product = await this.productRepository.findById(id);
        return ProductResponse.from(product);
    }
}
