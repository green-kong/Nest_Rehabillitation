import { MenuProduct } from '../../domain/menu-product.entity';

export class MenuProductRequest {
    productId: number;
    quantity: number;

    public static of(productId: number, quantity: number): MenuProductRequest {
        const menuProductRequest = new MenuProductRequest();
        menuProductRequest.productId = productId;
        menuProductRequest.quantity = quantity;
        return menuProductRequest;
    }

    public toMenuProduct(): MenuProduct {
        return MenuProduct.of(this.productId, this.quantity);
    }
}
