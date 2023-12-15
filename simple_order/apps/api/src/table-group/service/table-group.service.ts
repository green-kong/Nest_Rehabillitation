import { Injectable } from '@nestjs/common';
import { TableGroupRepository } from '../domain/table-group.repository';
import { TableGroup } from '../domain/table-group.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TableGroupingRequest } from '../controller/dto/table-grouping.request';
import { GroupingCreateEvent } from './event/grouping-create.event';
import { DataSource } from 'typeorm';

@Injectable()
export class TableGroupService {
    constructor(
        private readonly tableGroupRepository: TableGroupRepository,
        private readonly eventEmitter: EventEmitter2,
        private readonly dataSource: DataSource,
    ) {}

    public async saveTableGroup(tableGroupingRequest: TableGroupingRequest) {
        // const queryRunner = this.dataSource.createQueryRunner();
        // await queryRunner.connect();
        // await queryRunner.startTransaction();
        // try {
        //     queryRunner.manager.save(new TableGroup());
        // } catch (error) {
        // } finally {
        // }
        const tableGroup = await this.tableGroupRepository.saveTableGroup(
            new TableGroup(),
        );

        await this.eventEmitter.emitAsync(
            'grouping.create',
            new GroupingCreateEvent(
                tableGroup.id,
                tableGroupingRequest.tableIds,
            ),
        );
    }
}
