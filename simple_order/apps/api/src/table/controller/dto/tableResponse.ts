import { OrderTable } from '../../domain/table.entity';

export class TableResponse {
    id: number;
    seats: number;
    empty: boolean;

    public static from(table: OrderTable) {
        const tableResponse = new TableResponse();
        tableResponse.id = table.id;
        tableResponse.seats = table.getSeats();
        tableResponse.empty = table.empty;
        return tableResponse;
    }
}
