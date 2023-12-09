import { MenuRepository } from './menu.repository';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@libs/database';
import { Menu } from './menu.entity';
import { MenuProduct } from './menu-product.entity';

describe('menuRepository 테스트', () => {
    let repository: MenuRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot(typeORMConfig),
                TypeOrmModule.forFeature([Menu]),
            ],
            providers: [MenuRepository],
        }).compile();

        repository = module.get<MenuRepository>(MenuRepository);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    it('menu를 저장한다.', async () => {
        // given
        const menu = Menu.of('세트1', 22000, 2);
        const 짜장 = MenuProduct.of(1, 2);
        const 탕수육 = MenuProduct.of(2, 1);
        menu.addAllMenuProducts([짜장, 탕수육]);

        // when
        const savedMenu = await repository.save(menu);

        // then
        expect(savedMenu.id).toBeDefined();
        expect(savedMenu.getName()).toEqual('세트1');
        expect(savedMenu.getPrice()).toEqual(22000);
    });
});
