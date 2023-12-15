import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TableGroupService } from '../service/table-group.service';
import { TableGroupingRequest } from './dto/table-grouping.request';

@Controller('table-group')
export class TableGroupController {
    constructor(private readonly tableGroupService: TableGroupService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({ transform: true }))
    public async grouping(@Body() tableGroupingRequest: TableGroupingRequest) {
        await this.tableGroupService.saveTableGroup(tableGroupingRequest);
    }
}
