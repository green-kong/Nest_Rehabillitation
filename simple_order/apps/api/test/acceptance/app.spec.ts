import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ApiModule } from '../../src/api.module';
import { ProductCreateRequest } from '../../src/product/controller/dto/productCreateRequest';
import { ProductRepository } from '../../src/product/domain/Product.repository';
import { Product } from '../../src/product/domain/Product.entity';
import { afterEachCleanupDB } from '@app/test-util/TestUtil';

describe('ApiController (e2e)', () => {
    let app: INestApplication;
    let productRepo: ProductRepository;

    afterEachCleanupDB();

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ApiModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        productRepo = app.get<ProductRepository>(ProductRepository);
    });

    it('/product (POST)', () => {
        // given
        const productCreateRequest = ProductCreateRequest.of('떡볶이', 2000);

        // when & then
        return request(app.getHttpServer())
            .post('/product')
            .send(productCreateRequest)
            .expect(201)
            .expect('Location', '/product/1');
    });

    it('/product/:id (GET)', async () => {
        // given
        const product = await productRepo.save(Product.of('순대', 2000));

        // when & then
        return request(app.getHttpServer())
            .get(`/product/${product.id}`)
            .send()
            .expect(200);
    });
});
