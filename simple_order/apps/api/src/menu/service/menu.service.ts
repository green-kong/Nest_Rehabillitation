import { Injectable } from '@nestjs/common';
import { MenuRepository } from '../domain/menu.repository';
import { MenuCreateRequest } from '../controller/dto/menuCreateRequest';

@Injectable()
export class MenuService {
    constructor(private readonly menuRepository: MenuRepository) {}

    async save(menuCreateRequest: MenuCreateRequest) {
        const menu = menuCreateRequest.toMenu();
        const savedMenu = await this.menuRepository.save(menu);
        return savedMenu.id;
    }
}
