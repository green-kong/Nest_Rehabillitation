import { InjectRepository } from '@nestjs/typeorm';
import { TableGroup } from './table-group.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TableGroupRepository {
    constructor(
        @InjectRepository(TableGroup)
        private readonly tableGroups: Repository<TableGroup>,
    ) {}

    public async saveTableGroup(tableGroup: TableGroup): Promise<TableGroup> {
        return await this.tableGroups.save(tableGroup);
    }
}
