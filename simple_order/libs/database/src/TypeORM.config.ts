import { DataSourceOptions } from 'typeorm';
import { Product } from '../../../apps/api/src/product/domain/Product.entity';

export const typeORMConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 15432,
    username: 'postgres',
    password: 'qwer1234',
    database: 'test',
    entities: [Product],
    synchronize: true,
    logging: process.env.NODE_ENV === 'test',
};
