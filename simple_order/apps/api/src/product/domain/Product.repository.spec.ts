import { ProductRepository } from './Product.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../../../../../libs/config/TypeORM.config';
import { Product } from './Product.entity';
import { DataSource } from 'typeorm';

describe('프로덕트 리포지토리 테스트', () => {
    let repository: ProductRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([Product]),
            ],
            providers: [ProductRepository],
        }).compile();
        console.log(typeORMConfig.entities[0]);
        repository = module.get<ProductRepository>(ProductRepository);
    });

    // afterEach(() => {
    //     const dataSource = new DataSource({
    //         type: 'postgres',
    //         host: 'localhost',
    //         port: 15432,
    //         username: 'postgres',
    //         password: 'qwer1234',
    //         database: 'test',
    //     });
    //
    //     const repo = dataSource.getRepository(Product);
    //     repo.clear();
    // });

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
    });
});
