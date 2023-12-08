import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '@app/database/TypeORM.config';
import { MenuGroupModule } from './menu-group/menu-group.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        ProductModule,
        MenuGroupModule,
    ],
})
export class ApiModule {}
