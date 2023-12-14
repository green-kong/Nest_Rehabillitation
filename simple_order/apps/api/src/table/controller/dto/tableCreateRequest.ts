import { OrderTable } from '../../domain/table.entity';

export class TableCreateRequest {
    seats: number;

    public static from(seats: number): TableCreateRequest {
        const tableCreateRequest = new TableCreateRequest();
        tableCreateRequest.seats = seats;
        return tableCreateRequest;
    }

    public toTable(): OrderTable {
        return OrderTable.from(this.seats);
    }
}
