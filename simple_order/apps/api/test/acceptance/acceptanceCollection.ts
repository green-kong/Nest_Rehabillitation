import { MenuGroupCreateRequest } from '../../src/menu-group/controller/dto/menu-group-create.request';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ProductCreateRequest } from '../../src/product/controller/dto/productCreateRequest';
import { MenuCreateRequest } from '../../src/menu/controller/dto/menuCreateRequest';
import { MenuProductRequest } from '../../src/menu/controller/dto/menuProductRequest';

export const createMenuGroup = (app: INestApplication, productName: string) => {
    const menuGroupCreateRequest = MenuGroupCreateRequest.from(productName);

    return request(app.getHttpServer())
        .post('/menu-group')
        .send(menuGroupCreateRequest);
};

export const createProduct = (
    app: INestApplication,
    name: string,
    price: number,
) => {
    const productCreateRequest = ProductCreateRequest.of(name, price);
    return request(app.getHttpServer())
        .post('/product')
        .send(productCreateRequest);
};

export const createMenu = (
    app: INestApplication,
    name: string,
    price: number,
    menuGroupId: number,
    products: MenuProductParams[],
) => {
    const menuProductRequests = products.map((menuProduct) =>
        MenuProductRequest.of(menuProduct.productId, menuProduct.quantity),
    );
    const menuCreateRequest = MenuCreateRequest.of(
        name,
        price,
        menuGroupId,
        menuProductRequests,
    );
    return request(app.getHttpServer()) //
        .post('/menu')
        .send(menuCreateRequest);
};

export interface MenuProductParams {
    productId: number;
    quantity: number;
}
