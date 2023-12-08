import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Quantity } from '@libs/entity/vo/Quantity';

export class MenuProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @Column()
    quantity: Quantity;

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
