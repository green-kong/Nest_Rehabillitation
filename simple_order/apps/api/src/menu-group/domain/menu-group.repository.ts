import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuGroup } from './menu-group.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuGroupRepository {
    constructor(
        @InjectRepository(MenuGroup)
        private readonly menuGroups: Repository<MenuGroup>,
    ) {}

    public async save(menuGroup: MenuGroup): Promise<MenuGroup> {
        return await this.menuGroups.save(menuGroup);
    }

    public async findMenuGroupById(id: number): Promise<MenuGroup> {
        return await this.menuGroups.findOneBy({ id });
    }
}
