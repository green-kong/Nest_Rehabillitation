import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@libs/database';
import { Menu } from '../domain/menu.entity';
import { MenuRepository } from '../domain/menu.repository';
import { cleanupDB, Fixture, StubMenuValidator } from '@libs/test-util';
import { MenuResponse } from '../controller/dto/menuResponse';
import { DataSource } from 'typeorm';

describe('MenuService', () => {
    let service: MenuService;
    let repository: MenuRepository;
    let dataSource: DataSource;

    afterEach(async () => {
        await cleanupDB(dataSource);
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([Menu]),
            ],
            providers: [
                MenuService,
                MenuRepository,
                { provide: 'menuValidator', useClass: StubMenuValidator },
            ],
        }).compile();

        dataSource = module.get<DataSource>(DataSource);
        service = module.get<MenuService>(MenuService);
        repository = module.get<MenuRepository>(MenuRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('menu를 저장한다.', async () => {
        // given
        const menuName = '떡순튀';
        const menuPrice = 13000;
        const menuCreateRequestWithThreeProducts = Fixture.creatMenuRequest(
            menuName,
            menuPrice,
        );

        // when
        const savedId: number = await service.save(
            menuCreateRequestWithThreeProducts,
        );
        const menu = await repository.findMenuById(savedId);

        // then
        expect(menu.id).toEqual(savedId);
        expect(menu.getName()).toEqual(menuName);
        expect(menu.getPrice()).toEqual(menuPrice);
        expect(menu.menuGroupId).toEqual(1);
        expect(menu.menuProducts.length).toEqual(3);
    });

    it('저장된 menu를 조회한다.', async () => {
        // given
        const menuName = '떡순튀';
        const menuPrice = 13000;
        const menuCreateRequestWithThreeProducts = Fixture.creatMenuRequest(
            menuName,
            menuPrice,
        );
        const savedId: number = await service.save(
            menuCreateRequestWithThreeProducts,
        );

        // when
        const menuResponse: MenuResponse = await service.findMenuById(savedId);

        // then
        expect(menuResponse.id).toEqual(savedId);
        expect(menuResponse.name).toEqual(menuName);
        expect(menuResponse.price).toEqual(menuPrice);
        expect(menuResponse.menuProductResponses.length).toEqual(3);
    });
});
