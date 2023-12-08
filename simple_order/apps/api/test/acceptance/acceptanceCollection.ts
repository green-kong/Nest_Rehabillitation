import { MenuGroupCreateRequest } from '../../src/menu-group/controller/dto/menu-group-create.request';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ProductCreateRequest } from '../../src/product/controller/dto/productCreateRequest';

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
