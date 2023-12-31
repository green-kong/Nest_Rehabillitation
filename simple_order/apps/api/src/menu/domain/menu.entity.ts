import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Name, Price } from '@libs/entity';
import { MenuProduct } from './menu-product.entity';
import { MenuValidator } from '../service/menu.validator';

@Entity()
export class Menu extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Name, { prefix: false })
    name: Name;

    @Column(() => Price, { prefix: false })
    price: Price;

    @Column()
    menuGroupId: number;

    @OneToMany(
        () => MenuProduct, //
        (menuProduct) => menuProduct.menu,
        {
            cascade: ['insert', 'update'],
            eager: true,
        },
    )
    menuProducts: MenuProduct[];

    public static of(name: string, price: number, menuGroupId: number): Menu {
        const menuName = Name.from(name);
        const menuPrice = Price.from(price);
        const menu = new Menu();
        menu.name = menuName;
        menu.price = menuPrice;
        menu.menuGroupId = menuGroupId;
        menu.menuProducts = [];
        return menu;
    }

    public addMenuProduct(menuProduct: MenuProduct): void {
        this.menuProducts.push(menuProduct);
    }

    public addAllMenuProducts(menuProducts: MenuProduct[]): void {
        this.menuProducts = [...this.menuProducts, ...menuProducts];
    }

    public removeMenuProduct(menuProductId: number): void {
        this.menuProducts = this.menuProducts //
            .filter((menuProduct) => menuProduct.id !== menuProductId);
    }

    public async validate(menuValidator: MenuValidator): Promise<void> {
        await menuValidator.validate(this);
    }

    public getName() {
        return this.name.name;
    }

    public getPrice() {
        return this.price.price;
    }
}
