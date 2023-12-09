import { InjectRepository } from '@nestjs/typeorm';
import { Menu } from './menu.entity';
import { Repository } from 'typeorm';

export class MenuRepository {
    constructor(
        @InjectRepository(Menu) private readonly menus: Repository<Menu>,
    ) {}

    public async save(menu: Menu): Promise<Menu> {
        return this.menus.save(menu);
    }
}
