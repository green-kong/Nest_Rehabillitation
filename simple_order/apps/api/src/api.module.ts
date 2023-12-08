import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupModule } from './menu-group/menu-group.module';
import { typeORMConfig } from '@libs/database';
import { MenuModule } from './menu/menu.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ProductModule,
        MenuGroupModule,
        MenuModule,
    ],
})
export class ApiModule {}
