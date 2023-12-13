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
import { MenuService } from '../service/menu.service';
import { MenuCreateRequest } from './dto/menuCreateRequest';
import { Response } from 'express';
import { MenuResponse } from './dto/menuResponse';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    public async saveMenu(
        @Body() menuCreateRequest: MenuCreateRequest,
        @Res() response: Response,
    ): Promise<void> {
        const savedId = await this.menuService.saveMenu(menuCreateRequest);
        response //
            .setHeader('Location', `/menu/${savedId}`)
            .sendStatus(201);
    }

    @Get()
    public async findMenuById(
        @Param('id') menuGroupId: number,
    ): Promise<MenuResponse> {
        return await this.menuService.findMenuById(menuGroupId);
    }
}
