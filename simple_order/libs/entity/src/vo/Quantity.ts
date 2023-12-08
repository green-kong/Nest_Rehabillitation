import { Column } from 'typeorm';

export class Quantity {
    @Column()
    quantity: number;

    public static from(quantity: number): Quantity {
        if (quantity < 1) {
            throw Error('수량은 0보다 커야합니다.');
        }
        const newQuantity = new Quantity();
        newQuantity.quantity = quantity;
        return newQuantity;
    }
}