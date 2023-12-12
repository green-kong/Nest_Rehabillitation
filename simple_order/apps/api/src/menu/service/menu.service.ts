import { Injectable } from '@nestjs/common';
import { MenuRepository } from '../domain/menu.repository';
import { MenuCreateRequest } from '../controller/dto/menuCreateRequest';
import { MenuResponse } from '../controller/dto/menuResponse';

@Injectable()
export class MenuService {
    constructor(private readonly menuRepository: MenuRepository) {}

    async save(menuCreateRequest: MenuCreateRequest): Promise<number> {
        const menu = menuCreateRequest.toMenu();
        const savedMenu = await this.menuRepository.save(menu);
        return savedMenu.id;
    }

    async findMenuById(menuId: number): Promise<MenuResponse> {
        const menu = await this.menuRepository.findMenuById(menuId);
        return MenuResponse.from(menu);
    }
}
