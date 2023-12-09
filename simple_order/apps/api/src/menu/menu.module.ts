import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menu } from './domain/menu.entity';
import { MenuRepository } from './domain/menu.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Menu])],
    providers: [MenuRepository],
})
export class MenuModule {}
