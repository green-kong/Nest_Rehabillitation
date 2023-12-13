import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './domain/menu.entity';
import { MenuRepository } from './domain/menu.repository';
import { MenuService } from './service/menu.service';
import { DefaultMenuValidator } from './service/default.menu.validator';
import { MenuGroup } from '../menu-group/domain/menu-group.entity';
import { Product } from '../product/domain/Product.entity';
import { MenuGroupRepository } from '../menu-group/domain/menu-group.repository';
import { ProductRepository } from '../product/domain/Product.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Menu, MenuGroup, Product])],
    providers: [
        MenuRepository,
        MenuGroupRepository,
        ProductRepository,
        MenuService,
        { provide: 'menuValidator', useClass: DefaultMenuValidator },
    ],
})
export class MenuModule {}
