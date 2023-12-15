export class TableGroupingRequest {
    tableIds: number[];

    public static from(tableIds: number[]): TableGroupingRequest {
        const tableGroupingRequest = new TableGroupingRequest();
        tableGroupingRequest.tableIds = tableIds;
        return tableGroupingRequest;
    }
}
