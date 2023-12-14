import { Module } from '@nestjs/common';
import { TableService } from './service/table.service';
import { TableController } from './controller/table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTable } from './domain/table.entity';
import { TableRepository } from './domain/table.repository';

@Module({
    imports: [TypeOrmModule.forFeature([OrderTable])],
    providers: [TableService, TableRepository],
    controllers: [TableController],
})
export class TableModule {}
