import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly products: Repository<Product>,
    ) {}

    public async save(product: Product): Promise<Product> {
        return await this.products.save(product);
    }

    public async findById(productId: number): Promise<Product> {
        return await this.products.findOneBy({ id: productId });
    }
}
