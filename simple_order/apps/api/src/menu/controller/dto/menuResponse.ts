import { MenuProductResponse } from './menuProductResponse';
import { Menu } from '../../domain/menu.entity';

export class MenuResponse {
    id: number;
    name: string;
    price: number;
    menuGroupId: number;
    menuProductResponses: MenuProductResponse[];

    public static from(menu: Menu): MenuResponse {
        const menuResponse = new MenuResponse();
        menuResponse.id = menu.id;
        menuResponse.name = menu.getName();
        menuResponse.price = menu.getPrice();
        menuResponse.menuGroupId = menu.menuGroupId;
        const menuProductResponses: MenuProductResponse[] =
            menu.menuProducts.map(MenuProductResponse.from);
        menuResponse.menuProductResponses = menuProductResponses;
        return menuResponse;
    }
}
