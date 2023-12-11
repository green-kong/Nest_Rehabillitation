import { MenuProductRequest } from './menuProductRequest';
import { Menu } from '../../domain/menu.entity';

export class MenuCreateRequest {
    name: string;
    price: number;
    menuGroupId: number;
    menuProductRequests: MenuProductRequest[];

    public static of(
        name: string,
        price: number,
        menuGroupId: number,
        menuProductRequests: MenuProductRequest[],
    ) {
        const menuCreateRequest = new MenuCreateRequest();
        menuCreateRequest.name = name;
        menuCreateRequest.price = price;
        menuCreateRequest.menuGroupId = menuGroupId;
        menuCreateRequest.menuProductRequests = menuProductRequests;
        return menuCreateRequest;
    }

    public toMenu(): Menu {
        const menu = Menu.of(this.name, this.price, this.menuGroupId);
        const menuProducts = this.menuProductRequests //
            .map((request) => request.toMenuProduct());
        menu.addAllMenuProducts(menuProducts);
        return menu;
    }
}
