import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 15432,
    username: 'postgres',
    password: 'qwer1234',
    database: 'test',
    entities: [path.join(__dirname, '../../apps/api/src/**/*.entity.{js,ts}')],
    synchronize: true,
};
