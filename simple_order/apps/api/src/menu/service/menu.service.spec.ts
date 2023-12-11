import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@libs/database';
import { Menu } from '../domain/menu.entity';
import { MenuRepository } from '../domain/menu.repository';
import { afterEachCleanupDB } from '@libs/test-util';
import { MenuProductRequest } from '../controller/dto/menuProductRequest';
import { MenuCreateRequest } from '../controller/dto/menuCreateRequest';

describe('MenuService', () => {
    let service: MenuService;
    let repository: MenuRepository;

    afterEachCleanupDB();

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([Menu]),
            ],
            providers: [MenuService, MenuRepository],
        }).compile();

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
        const menuGroupId = 2;

        const productId1 = 1;
        const menuProductQuantity1 = 20;
        const menuProductRequest1: MenuProductRequest = MenuProductRequest.of(
            productId1,
            menuProductQuantity1,
        );

        const productId2 = 2;
        const menuProductQuantity2 = 10;
        const menuProductRequest2 = MenuProductRequest.of(
            productId2,
            menuProductQuantity2,
        );

        const menuProductRequests: MenuProductRequest[] = [
            menuProductRequest1,
            menuProductRequest2,
        ];
        const menuCreateRequest: MenuCreateRequest = MenuCreateRequest.of(
            menuName,
            menuPrice,
            menuGroupId,
            menuProductRequests,
        );

        // when
        const savedId: number = await service.save(menuCreateRequest);
        const menu = await repository.findMenuById(savedId);

        // then
        expect(menu.id).toEqual(savedId);
        expect(menu.getName()).toEqual(menuName);
        expect(menu.getPrice()).toEqual(menuPrice);
        expect(menu.menuGroupId).toEqual(menuGroupId);
        expect(menu.menuProducts.length).toEqual(2);
    });
});
