import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { cleanupDB } from '@libs/test-util';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from '../../src/api.module';
import {
    createMenu,
    createMenuGroup,
    createProduct,
} from './acceptanceCollection';

describe('MenuGroup E2E 테스트', () => {
    let dataSource: DataSource;
    let app: INestApplication;

    afterEach(async () => {
        await cleanupDB(dataSource);
        await app.close();
    });

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ApiModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        dataSource = moduleFixture.get<DataSource>(DataSource);

        await app.init();
    });

    it('/menu (POST)', async () => {
        await createMenuGroup(app, '분식');
        await createProduct(app, '떡볶이', 3000);
        await createProduct(app, '순대', 3500);
        await createProduct(app, '튀김', 2500);

        return createMenu(app, '떡순튀', 12000, 1, [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 },
            { productId: 3, quantity: 1 },
        ])
            .expect(201)
            .expect('Location', '/menu/1');
    });
});
