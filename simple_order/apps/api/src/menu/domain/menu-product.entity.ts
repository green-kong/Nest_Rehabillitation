import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Quantity } from '@libs/entity/vo/Quantity';
import { Menu } from './menu.entity';

export class MenuProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    quantity: Quantity;

    @ManyToOne(() => Menu, (menu) => menu.menuProducts)
    menu: Menu;

    public static of(productId: number, quantity: number): MenuProduct {
        const menuProduct = new MenuProduct();
        menuProduct.productId = productId;
        menuProduct.quantity = Quantity.from(quantity);
        return menuProduct;
    }

    public getQuantity() {
        return this.quantity.quantity;
    }
}
