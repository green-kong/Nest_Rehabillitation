export class GroupingCreateEvent {
    groupTableId: number;
    tableIds: number[];

    constructor(id: number, tableIds: number[]) {
        this.groupTableId = id;
        this.tableIds = tableIds;
    }
}
