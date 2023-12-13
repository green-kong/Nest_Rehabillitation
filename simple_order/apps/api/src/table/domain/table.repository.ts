import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderTable } from './table.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TableRepository {
    constructor(
        @InjectRepository(OrderTable)
        private readonly orderTables: Repository<OrderTable>,
    ) {}

    public async save(table: OrderTable): Promise<OrderTable> {
        return await this.orderTables.save(table);
    }

    public async findTableById(tableId: number): Promise<OrderTable> {
        return await this.orderTables.findOneBy({ id: tableId });
    }

    public async findTableByIds(tableIds: number[]): Promise<OrderTable[]> {
        return await this.orderTables.findBy({ id: In(tableIds) });
    }
}
