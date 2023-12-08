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
import { MenuGroupService } from '../service/menu-group.service';
import { MenuGroupCreateRequest } from './dto/menu-group-create.request';
import { Response } from 'express';
import { MenuGroupResponse } from './dto/menu-group.response';

@Controller('menu-group')
export class MenuGroupController {
    constructor(private readonly menuGroupService: MenuGroupService) {}

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    public async saveMenuGroup(
        @Body() menuGroupCreateRequest: MenuGroupCreateRequest,
        @Res() response: Response,
    ): Promise<void> {
        const savedId = await this.menuGroupService.saveMenuGroup(
            menuGroupCreateRequest,
        );
        response
            .setHeader('Location', `/menu-group/${savedId}`)
            .sendStatus(201);
    }

    @Get(':id')
    public async findMenuGroupById(
        @Param('id') menuGroupId: number,
    ): Promise<MenuGroupResponse> {
        return await this.menuGroupService.findMenuGroupById(menuGroupId);
    }
}
