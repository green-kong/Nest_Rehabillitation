import { Test, TestingModule } from '@nestjs/testing';
import { MenuGroupService } from './menu-group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupRepository } from '../domain/menu-group.repository';
import { typeORMConfig } from '@libs/database';
import { cleanupDB } from '@libs/test-util';
import { MenuGroup } from '../domain/menu-group.entity';
import { MenuGroupCreateRequest } from '../controller/dto/menu-group-create.request';
import { DataSource } from 'typeorm';

describe('MenuGroupService', () => {
    let service: MenuGroupService;
    let menuGroupRepository: MenuGroupRepository;
    let dataSource: DataSource;

    afterEach(async () => {
        await cleanupDB(dataSource);
    });
    // afterEachCleanupDB();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([MenuGroup]),
            ],
            providers: [MenuGroupService, MenuGroupRepository],
        }).compile();

        service = module.get<MenuGroupService>(MenuGroupService);
        menuGroupRepository =
            module.get<MenuGroupRepository>(MenuGroupRepository);
        dataSource = module.get<DataSource>(DataSource);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('saveMenuGroup 테스트', () => {
        it('메뉴 그룹을 저장한다.', async () => {
            // given
            const name = '분식';
            const menuGroupCreateRequest = MenuGroupCreateRequest.from(name);

            // when
            const savedId = await service.saveMenuGroup(menuGroupCreateRequest);
            const menuGroup =
                await menuGroupRepository.findMenuGroupById(savedId);

            // then
            expect(menuGroup.id).toEqual(savedId);
            expect(menuGroup.getName()).toEqual(name);
        });
    });

    describe('findMenuGroupById 테스트', () => {
        it('메뉴 그룹을 조회한다.', async () => {
            // given
            const name = '중식';
            const menuGroup = await menuGroupRepository.save(
                MenuGroup.from(name),
            );

            // when
            const menuGroupResponse = await service.findMenuGroupById(
                menuGroup.id,
            );

            // then
            expect(menuGroupResponse.id).toEqual(menuGroup.id);
            expect(menuGroupResponse.name).toEqual(name);
        });
    });
});
