import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../../../libs/config/TypeORM.config';

@Module({
    imports: [ProductModule, TypeOrmModule.forRoot(typeORMConfig)],
})
export class ApiModule {}
