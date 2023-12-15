import { Injectable } from '@nestjs/common';
import { TableRepository } from '../domain/table.repository';
import { OrderTable } from '../domain/table.entity';
import { TableCreateRequest } from '../controller/dto/tableCreateRequest';
import { TableResponse } from '../controller/dto/tableResponse';
import { OnEvent } from '@nestjs/event-emitter';

import { GroupingCreateEvent } from '../../table-group/service/event/grouping-create.event';
import * as console from 'console';

@Injectable()
export class TableService {
    constructor(private readonly tableRepository: TableRepository) {}

    public async saveTable(tableCreateRequest: TableCreateRequest) {
        const table: OrderTable = tableCreateRequest.toTable();
        const savedTable = await this.tableRepository.save(table);
        return savedTable.id;
    }

    public async findTableById(tableId: number): Promise<TableResponse> {
        const table = await this.tableRepository.findTableById(tableId);
        return TableResponse.from(table);
    }

    @OnEvent('grouping.create')
    public async handleGroupingEvent(event: GroupingCreateEvent) {
        const { groupTableId, tableIds } = event;
        const orderTables = await this.tableRepository.findTableByIds(tableIds);

        if (orderTables.length !== tableIds.length) {
            throw new Error('123');
        }

        orderTables.forEach((orderTable) => {
            orderTable.groupBy(groupTableId);
            this.tableRepository.save(orderTable);
        });
    }
}
