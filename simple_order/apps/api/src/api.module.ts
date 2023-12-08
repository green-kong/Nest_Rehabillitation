import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupModule } from './menu-group/menu-group.module';
import { typeORMConfig } from '@libs/database';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ProductModule,
        MenuGroupModule,
    ],
})
export class ApiModule {}
