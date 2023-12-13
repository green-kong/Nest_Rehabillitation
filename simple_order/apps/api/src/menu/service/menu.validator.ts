import { Menu } from '../domain/menu.entity';

export interface MenuValidator {
    validate(menu: Menu): Promise<void>;
}
