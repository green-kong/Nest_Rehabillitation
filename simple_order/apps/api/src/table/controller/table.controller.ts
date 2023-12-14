import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { TableCreateRequest } from './dto/tableCreateRequest';
import { TableService } from '../service/table.service';
import { Response } from 'express';
import { TableResponse } from './dto/tableResponse';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    public async saveTable(
        @Body() tableCreateRequest: TableCreateRequest,
        @Res({ passthrough: true }) response: Response,
    ): Promise<void> {
        const savedId = await this.tableService.saveTable(tableCreateRequest);
        response //
            .setHeader('Location', `/table/${savedId}`)
            .status(201);
    }

    @Get(':id')
    public async findByTableById(
        @Param('id') tableId: number,
    ): Promise<TableResponse> {
        return await this.tableService.findTableById(tableId);
    }
}
