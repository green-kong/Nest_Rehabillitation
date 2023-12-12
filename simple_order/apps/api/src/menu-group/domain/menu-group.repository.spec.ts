import { MenuGroupRepository } from './menu-group.repository';
import { afterEachCleanupDB, testCleanupDB } from '@libs/test-util';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@libs/database';
import { MenuGroup } from './menu-group.entity';
import { INestApplication } from '@nestjs/common';

describe('menuGroupRepository 테스트', () => {
    let menuGroupRepository: MenuGroupRepository;
    let app: INestApplication;

    afterEach(async () => {
        await testCleanupDB(app);
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([MenuGroup]),
            ],
            providers: [MenuGroupRepository],
        }).compile();

        menuGroupRepository =
            module.get<MenuGroupRepository>(MenuGroupRepository);
        app = module.createNestApplication();
    });

    it('shoud be defined', () => {
        expect(menuGroupRepository).toBeDefined();
    });

    describe('save 테스트', () => {
        it('메뉴그룹을 저장한다.', async () => {
            // given
            const menuGroupName = '분식';
            const menuGroup = MenuGroup.from(menuGroupName);

            // when
            const savedMenuGroup = await menuGroupRepository.save(menuGroup);

            // then
            expect(savedMenuGroup.getName()).toEqual(menuGroupName);
        });
    });

    describe('findMenuGroupById 테스트', () => {
        it('메뉴그룹을 조회한다.', async () => {
            // given
            const menuGroupName = '분식';
            const menuGroup = MenuGroup.from(menuGroupName);
            const savedMenuGroup = await menuGroupRepository.save(menuGroup);

            // when
            const foundMenuGroup = await menuGroupRepository.findMenuGroupById(
                savedMenuGroup.id,
            );

            // then
            expect(foundMenuGroup).toEqual(savedMenuGroup);
        });
    });
});
