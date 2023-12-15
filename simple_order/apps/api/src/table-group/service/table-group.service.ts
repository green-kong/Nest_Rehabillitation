import { Injectable } from '@nestjs/common';
import { TableGroup } from '../domain/table-group.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TableGroupingRequest } from '../controller/dto/table-grouping.request';
import { GroupingCreateEvent } from './event/grouping-create.event';
import { DataSource } from 'typeorm';

@Injectable()
export class TableGroupService {
    constructor(
        private readonly eventEmitter: EventEmitter2,
        private readonly dataSource: DataSource,
    ) {}

    public async saveTableGroup(tableGroupingRequest: TableGroupingRequest) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const tableGroup = await queryRunner.manager.save(new TableGroup());
            const eventResults = await this.eventEmitter.emitAsync(
                'grouping.create',
                new GroupingCreateEvent(
                    tableGroup.id,
                    tableGroupingRequest.tableIds,
                ),
            );

            if (eventResults.includes(false)) {
                throw new Error('do Rollback');
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            console.error(error.message);
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }
}
