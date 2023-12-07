import { ProductRepository } from './Product.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../../../../../libs/config/TypeORM.config';
import { Product } from './Product.entity';
import { afterEachCleanupDB } from '../../../../../libs/test-util/TestUtil';

describe('프로덕트 리포지토리 테스트', () => {
    let repository: ProductRepository;

    afterEachCleanupDB();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([Product]),
            ],
            providers: [ProductRepository],
        }).compile();
        repository = module.get<ProductRepository>(ProductRepository);
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
    });
});
