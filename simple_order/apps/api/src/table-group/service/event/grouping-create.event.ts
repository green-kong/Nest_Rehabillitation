export class GroupingCreateEvent {
    groupTableId: number;
    tableIds: number[];

    constructor(groupTableId: number, tableIds: number[]) {
        this.groupTableId = groupTableId;
        this.tableIds = tableIds;
    }
}
