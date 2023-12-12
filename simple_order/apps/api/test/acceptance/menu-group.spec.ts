import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ApiModule } from '../../src/api.module';
import { testCleanupDB } from '@libs/test-util';
import { createMenuGroup } from './acceptanceCollection';

describe('MenuGroup E2E 테스트', () => {
    let app: INestApplication;

    afterEach(async () => {
        await testCleanupDB(app);
    });
    // afterEachCleanupDB();

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ApiModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/menu-group (POST)', () => {
        return createMenuGroup(app, '일식') //
            .expect(201)
            .expect('Location', '/menu-group/1');
    });

    it('/menu-group/:id (GET)', async () => {
        // given
        let menuGroupId: number;

        await createMenuGroup(app, '일식') //
            .then((res) => {
                const strings = res.header.location.split('/');
                menuGroupId = +strings[2];
            });

        // when & then
        return request(app.getHttpServer())
            .get(`/menu-group/${menuGroupId}`)
            .send()
            .expect(200);
    });
});
