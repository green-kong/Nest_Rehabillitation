import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { In, Repository } from 'typeorm';
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

    public async findByIds(productIds: number[]): Promise<Product[]> {
        return await this.products.findBy({ id: In(productIds) });
    }
}
