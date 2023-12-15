import { MenuGroupCreateRequest } from '../../src/menu-group/controller/dto/menu-group-create.request';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ProductCreateRequest } from '../../src/product/controller/dto/productCreateRequest';
import { MenuCreateRequest } from '../../src/menu/controller/dto/menuCreateRequest';
import { MenuProductRequest } from '../../src/menu/controller/dto/menuProductRequest';
import { TableCreateRequest } from '../../src/table/controller/dto/tableCreateRequest';
import { TableGroupingRequest } from '../../src/table-group/controller/dto/table-grouping.request';

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

export const createTable = (app: INestApplication, seats: number) => {
    const tableCreateRequest = TableCreateRequest.from(seats);
    return request(app.getHttpServer()) //
        .post('/table')
        .send(tableCreateRequest);
};

export const createTableGroup = (app: INestApplication, tableIds: number[]) => {
    const tableGroupingRequest = TableGroupingRequest.from(tableIds);
    return request(app.getHttpServer()) //
        .post('/table-group')
        .send(tableGroupingRequest);
};

export interface MenuProductParams {
    productId: number;
    quantity: number;
}
