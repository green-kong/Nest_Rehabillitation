import { Module } from '@nestjs/common';
import { TableGroupService } from './service/table-group.service';
import { TableGroupController } from './controller/table-group.controller';
import { TableGroupRepository } from './domain/table-group.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableGroup } from './domain/table-group.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TableGroup])],
    providers: [TableGroupService, TableGroupRepository],
    controllers: [TableGroupController],
})
export class TableGroupModule {}
