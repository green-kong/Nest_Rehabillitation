import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { cleanupDB } from '@libs/test-util';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from '../../src/api.module';
import { createTable } from './acceptanceCollection';
import request from 'supertest';

describe('MenuGroup E2E 테스트', () => {
    let dataSource: DataSource;
    let app: INestApplication;

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

    it('/table (POST)', () => {
        return createTable(app, 2) //
            .expect(201)
            .expect('Location', '/table/1');
    });

    it('/table/:id (GET)', async () => {
        // given

        const response = await createTable(app, 3);
        const strings = response.header.location.split('/');
        const tableId = +strings[2];

        // when & then
        return request(app.getHttpServer())
            .get(`/table/${tableId}`)
            .send()
            .expect(200);
    });
});
