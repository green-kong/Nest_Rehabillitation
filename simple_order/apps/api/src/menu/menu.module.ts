import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './domain/menu.entity';
import { MenuRepository } from './domain/menu.repository';
import { MenuService } from './service/menu.service';

@Module({
    imports: [TypeOrmModule.forFeature([Menu])],
    providers: [MenuRepository, MenuService],
})
export class MenuModule {}
