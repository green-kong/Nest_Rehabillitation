import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from '../domain/Product.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../domain/Product.entity';
import { ProductCreateRequest } from '../controller/dto/productCreateRequest';
import { cleanupDB } from '@libs/test-util';
import { typeORMConfig } from '@libs/database';
import { DataSource } from 'typeorm';

describe('ProductService', () => {
    let service: ProductService;
    let repository: ProductRepository;
    let dataSource: DataSource;

    afterEach(async () => {
        await cleanupDB(dataSource);
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([Product]),
            ],
            providers: [ProductService, ProductRepository],
        }).compile();

        service = module.get<ProductService>(ProductService);
        repository = module.get<ProductRepository>(ProductRepository);
        dataSource = module.get<DataSource>(DataSource);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('saveProduct 테스트', () => {
        it('product를 저장한다.', async () => {
            // given
            const productCreateRequest: ProductCreateRequest =
                ProductCreateRequest.of('떡볶이', 4000);

            // when
            const createdId: number =
                await service.saveProduct(productCreateRequest);
            const product = await repository.findById(createdId);

            // then
            expect(product.id).toEqual(createdId);
            expect(product.getName()).toEqual('떡볶이');
            expect(product.getPrice()).toEqual(4000);
        });
    });

    describe('findProductTest', () => {
        it('product를 조회한다.', async () => {
            // given
            const product = await repository.save(Product.of('순대', 2000));

            // when
            const productResponse = await service.findProduct(product.id);

            // then
            expect(productResponse.name).toEqual(product.getName());
            expect(productResponse.price).toEqual(product.getPrice());
        });
    });
});
