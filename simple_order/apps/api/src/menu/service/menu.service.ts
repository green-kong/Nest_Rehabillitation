import { Inject, Injectable } from '@nestjs/common';
import { MenuRepository } from '../domain/menu.repository';
import { MenuCreateRequest } from '../controller/dto/menuCreateRequest';
import { MenuResponse } from '../controller/dto/menuResponse';
import { MenuValidator } from './menu.validator';

@Injectable()
export class MenuService {
    constructor(
        @Inject('menuValidator') private readonly menuValidator: MenuValidator,
        private readonly menuRepository: MenuRepository,
    ) {}

    async save(menuCreateRequest: MenuCreateRequest): Promise<number> {
        const menu = menuCreateRequest.toMenu();
        await menu.validate(this.menuValidator);
        const savedMenu = await this.menuRepository.save(menu);
        return savedMenu.id;
    }

    async findMenuById(menuId: number): Promise<MenuResponse> {
        const menu = await this.menuRepository.findMenuById(menuId);
        return MenuResponse.from(menu);
    }
}
