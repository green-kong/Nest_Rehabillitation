import { ProductRepository } from './Product.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../../../../../libs/config/TypeORM.config';
import { Product } from './Product.entity';
import { TestUtil } from '../../../../../libs/test-util/TestUtil';
import * as console from 'console';

describe('프로덕트 리포지토리 테스트', () => {
    const testUtil: TestUtil = new TestUtil(typeORMConfig);
    let repository: ProductRepository;

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

    afterEach(async () => {
        await testUtil.removeAll();
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
            console.log(product.id);
            // then
            expect(savedProduct.getName()).toEqual(name);
            expect(savedProduct.getPrice()).toEqual(price);
        });
    });
});
