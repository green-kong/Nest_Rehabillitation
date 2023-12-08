import { Injectable } from '@nestjs/common';
import { MenuGroupRepository } from '../domain/menu-group.repository';
import { MenuGroup } from '../domain/menu-group.entity';
import { MenuGroupCreateRequest } from '../controller/dto/menu-group-create.request';
import { MenuGroupResponse } from '../controller/dto/menu-group.response';

@Injectable()
export class MenuGroupService {
    constructor(private readonly menuGroupRepository: MenuGroupRepository) {}

    public async saveMenuGroup(
        menuGroupCreateRequest: MenuGroupCreateRequest,
    ): Promise<number> {
        const menuGroup: MenuGroup = menuGroupCreateRequest.toMenuGroup();
        const savedMenuGroup = await this.menuGroupRepository.save(menuGroup);
        return savedMenuGroup.id;
    }

    async findMenuGroupById(id: number) {
        const menuGroup = await this.menuGroupRepository.findMenuGroupById(id);
        return MenuGroupResponse.from(menuGroup);
    }
}
