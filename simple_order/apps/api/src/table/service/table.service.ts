import { Injectable } from '@nestjs/common';
import { TableRepository } from '../domain/table.repository';
import { OrderTable } from '../domain/table.entity';
import { TableCreateRequest } from '../controller/dto/tableCreateRequest';
import { TableResponse } from '../controller/dto/tableResponse';
import { OnEvent } from '@nestjs/event-emitter';

import { GroupingCreateEvent } from '../../table-group/service/event/grouping-create.event';
import { DataSource } from 'typeorm';

@Injectable()
export class TableService {
    constructor(
        private readonly tableRepository: TableRepository,
        private readonly dataSource: DataSource,
    ) {}

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
    public async handleGroupingEvent(
        event: GroupingCreateEvent,
    ): Promise<boolean> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { groupTableId, tableIds } = event;
            const orderTables =
                await this.tableRepository.findTableByIds(tableIds);

            if (orderTables.length !== tableIds.length) {
                throw new Error(
                    `존재하지 않는 table이 포함되어 있습니다. tableIds = ${tableIds}`,
                );
            }

            for (const orderTable of orderTables) {
                orderTable.groupBy(groupTableId);
                await queryRunner.manager.save(orderTable);
            }
            await queryRunner.commitTransaction();
            return true;
        } catch (error) {
            console.error(error.message);
            await queryRunner.rollbackTransaction();
            return false;
        } finally {
            await queryRunner.release();
        }
    }
}
