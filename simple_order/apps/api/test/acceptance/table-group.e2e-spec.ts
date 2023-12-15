import { DataSource } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { cleanupDB } from '@libs/test-util';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiModule } from '../../src/api.module';
import { createTable, createTableGroup } from './acceptanceCollection';

describe('table-group E2E 테스트', () => {
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

    it('/table-group (POST)', async () => {
        await createTable(app, 3);
        await createTable(app, 4);

        return createTableGroup(app, [1, 2]).expect(201);
    });
});
