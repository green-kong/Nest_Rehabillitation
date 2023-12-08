import { MenuProduct } from './menu-product.entity';

export class MenuProducts {
    menuProducts: MenuProduct[];

    public static from(meuProducts: MenuProduct[]) {
        const newMenuProducts = new MenuProducts();
        newMenuProducts.menuProducts = meuProducts;
        return meuProducts;
    }
}
