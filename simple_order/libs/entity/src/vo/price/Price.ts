import { Column } from 'typeorm';

export class Price {
    @Column()
    price: number;

    public static from(price: number): Price {
        if (price <= 0) {
            throw Error('가격은 0보다 커야합니다.');
        }
        const newPrice = new Price();
        newPrice.price = price;
        return newPrice;
    }
}
