import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupModule } from './menu-group/menu-group.module';
import { typeORMConfig } from '@libs/database';
import { MenuModule } from './menu/menu.module';
import { TableModule } from './table/table.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ProductModule,
        MenuGroupModule,
        MenuModule,
        TableModule,
    ],
})
export class ApiModule {}
