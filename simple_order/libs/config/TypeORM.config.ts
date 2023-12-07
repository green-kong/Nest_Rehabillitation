import * as path from 'path';
import { DataSourceOptions } from 'typeorm';

export const typeORMConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 15432,
    username: 'postgres',
    password: 'qwer1234',
    database: 'test',
    entities: [path.join(__dirname, '../../apps/api/src/**/*.entity.{js,ts}')],
    synchronize: true,
    logging: process.env.NODE_ENV === 'test',
};
