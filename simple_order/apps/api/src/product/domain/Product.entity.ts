import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from '../../../../../libs/vo/name/Name';
import { Price } from '../../../../../libs/vo/price/Price';

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Name)
    name: Name;

    @Column(() => Price)
    price: Price;

    public static of(name: string, price: number): Product {
        const productName = Name.from(name);
        const productPrice = Price.from(price);

        const product = new Product();
        product.name = productName;
        product.price = productPrice;

        return product;
    }

    public getName(): string {
        return this.name.name;
    }

    public getPrice(): number {
        return this.price.price;
    }
}
