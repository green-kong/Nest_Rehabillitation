import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupModule } from './menu-group/menu-group.module';
import { typeORMConfig } from '@libs/database';
import { MenuModule } from './menu/menu.module';
import { TableModule } from './table/table.module';
import { TableGroupModule } from './table-group/table-group.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeORMConfig),
        EventEmitterModule.forRoot({
            wildcard: false,
            delimiter: '.',
            newListener: false,
            removeListener: false,
            maxListeners: 10,
            verboseMemoryLeak: false,
            ignoreErrors: false,
        }),
        ProductModule,
        MenuGroupModule,
        MenuModule,
        TableModule,
        TableGroupModule,
    ],
})
export class ApiModule {}
