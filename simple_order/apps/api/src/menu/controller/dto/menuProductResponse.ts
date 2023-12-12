import { MenuProduct } from '../../domain/menu-product.entity';

export class MenuProductResponse {
    id: number;
    quantity: number;
    productId: number;

    public static from(menuProduct: MenuProduct): MenuProductResponse {
        const menuProductResponse = new MenuProductResponse();
        menuProductResponse.id = menuProduct.id;
        menuProductResponse.quantity = menuProduct.getQuantity();
        menuProductResponse.productId = menuProduct.productId;
        return menuProductResponse;
    }
}
