import { Injectable } from '@nestjs/common';
import { TableRepository } from '../domain/table.repository';
import { OrderTable } from '../domain/table.entity';
import { TableCreateRequest } from '../controller/dto/tableCreateRequest';
import { TableResponse } from '../controller/dto/tableResponse';

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
}
