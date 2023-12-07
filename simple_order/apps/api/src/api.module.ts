import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from '../../../libs/config/TypeORM.config';

@Module({
    imports: [ProductModule, TypeOrmModule.forRoot(typeORMConfig)],
    controllers: [ApiController],
    providers: [ApiService],
})
export class ApiModule {}
