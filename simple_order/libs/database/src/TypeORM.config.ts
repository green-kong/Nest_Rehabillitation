import { DataSourceOptions } from 'typeorm';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeORMConfig: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 15432,
    username: 'postgres',
    password: 'qwer1234',
    database: 'test',
    entities: [
        path.join(__dirname, '../../../', 'apps', '**', '*.entity.{ts,js}'),
    ],
    synchronize: true,
    logging: process.env.NODE_ENV === 'test',
    namingStrategy: new SnakeNamingStrategy(),
};
