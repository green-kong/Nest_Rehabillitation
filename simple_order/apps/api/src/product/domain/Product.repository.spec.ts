import { ProductRepository } from './Product.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './Product.entity';
import { cleanupDB } from '@libs/test-util';
import { typeORMConfig } from '@libs/database';
import { DataSource } from 'typeorm';

describe('프로덕트 리포지토리 테스트', () => {
    let repository: ProductRepository;
    let dataSource: DataSource;

    afterEach(async () => {
        await cleanupDB(dataSource);
    });

    // afterEachCleanupDB();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([Product]),
            ],
            providers: [ProductRepository],
        }).compile();
        repository = module.get<ProductRepository>(ProductRepository);
        dataSource = module.get<DataSource>(DataSource);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('Product를 저장한다.', () => {
        it('product를 저장한다.', async () => {
            // given
            const price = 3500;
            const name = '순대';
            const product = Product.of(name, price);

            // when
            const savedProduct = await repository.save(product);
            // then
            expect(savedProduct.getName()).toEqual(name);
            expect(savedProduct.getPrice()).toEqual(price);
        });

        it('저장한 product를 조회한다.', async () => {
            // given
            const price = 3500;
            const name = '순대';
            const product = Product.of(name, price);
            const savedProduct = await repository.save(product);

            // when
            const foundProduct = await repository.findById(savedProduct.id);

            // then
            expect(foundProduct.id).toEqual(savedProduct.id);
            expect(foundProduct.getName()).toEqual(name);
            expect(foundProduct.getPrice()).toEqual(price);
        });

        it('저장한 product를 한번에 여러개 조회한다.', async () => {
            // given
            const 떡볶이 = Product.of('떡볶이', 3500);
            const 순대 = Product.of('순대', 3000);
            const 튀김 = Product.of('튀김', 3000);
            const savedProduct1 = await repository.save(떡볶이);
            const savedProduct2 = await repository.save(순대);
            const savedProduct3 = await repository.save(튀김);

            // when
            const products = await repository.findByIds([
                savedProduct1.id,
                savedProduct2.id,
                savedProduct3.id,
            ]);

            // then
            expect(products.length).toEqual(3);
        });
    });
});
