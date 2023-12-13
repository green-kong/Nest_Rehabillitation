import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApiModule } from '../../src/api.module';
import { cleanupDB } from '@libs/test-util';
import { createProduct } from './acceptanceCollection';
import { DataSource } from 'typeorm';

describe('ApiController (e2e)', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    afterEach(async () => {
        await cleanupDB(dataSource);
    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ApiModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        dataSource = moduleFixture.get<DataSource>(DataSource);
        await app.init();
    });

    it('/product (POST)', () => {
        return createProduct(app, '떡볶이', 2000)
            .expect(201)
            .expect('Location', '/product/1');
    });

    it('/product/:id (GET)', async () => {
        // given
        let productId: number;
        await createProduct(app, '순대', 3000) //
            .expect((res) => {
                const stringId = res.header.location.split('/');
                productId = +stringId[2];
            });

        // when & then
        return request(app.getHttpServer())
            .get(`/product/${productId}`)
            .send()
            .expect(200);
    });
});
