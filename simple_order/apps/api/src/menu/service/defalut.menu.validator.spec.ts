import { DataSource } from 'typeorm';
import { cleanupDB } from '@libs/test-util';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@libs/database';
import { DefaultMenuValidator } from './default.menu.validator';
import { Product } from '../../product/domain/Product.entity';
import { MenuGroup } from '../../menu-group/domain/menu-group.entity';
import { MenuGroupRepository } from '../../menu-group/domain/menu-group.repository';
import { ProductRepository } from '../../product/domain/Product.repository';
import { Menu } from '../domain/menu.entity';
import { MenuProduct } from '../domain/menu-product.entity';

describe('DefaultMenuValidator 테스트', () => {
    let dataSource: DataSource;
    let menuValidator: DefaultMenuValidator;
    let menuGroupRepository: MenuGroupRepository;

    afterEach(async () => {
        await cleanupDB(dataSource);
        await dataSource.destroy();
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([MenuGroup, Product]),
            ],
            providers: [
                DefaultMenuValidator,
                MenuGroupRepository,
                ProductRepository,
            ],
        }).compile();

        dataSource = module.get<DataSource>(DataSource);
        menuValidator = module.get<DefaultMenuValidator>(DefaultMenuValidator);
        menuGroupRepository =
            module.get<MenuGroupRepository>(MenuGroupRepository);
    });

    it('should be defined', () => {
        expect(menuValidator).toBeDefined();
    });

    it('menuGroup이 존재하지 않으면 예외가 발생한다.', () => {
        // given
        const unExistedMenuGroupId = 1;
        const menu = Menu.of('떡순튀', 2000, unExistedMenuGroupId);

        // when & then
        expect(async () => {
            await menuValidator.validate(menu);
        }).rejects.toThrow(
            Error(
                `존재하지 않는 메뉴그룹 아이디 입니다. menuGroupId = ${unExistedMenuGroupId}`,
            ),
        );
    });

    it('menu의 product에 존재하지 않는 product가 포함되어 있는 경우 예외가 발생한다.', async () => {
        // given
        const menuGroup = await menuGroupRepository.save(
            MenuGroup.from('분식'),
        );
        const menu = Menu.of('떡순튀', 2000, menuGroup.id);
        const unExistedProductIds = [1, 2];
        menu.addAllMenuProducts([MenuProduct.of(1, 10), MenuProduct.of(2, 20)]);

        // when & then
        await expect(async () => {
            await menuValidator.validate(menu);
        }).rejects.toThrow(
            Error(
                `존재하지 않는 product가 포함되어 있습니다. productIds = ${unExistedProductIds}`,
            ),
        );
    });
});
