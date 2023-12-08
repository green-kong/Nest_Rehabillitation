import { Module } from '@nestjs/common';
import { MenuGroupService } from './service/menu-group.service';
import { MenuGroupRepository } from './domain/menu-group.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuGroupController } from './controller/menu-group.controller';
import { MenuGroup } from './domain/menu-group.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MenuGroup])],
    providers: [MenuGroupService, MenuGroupRepository],
    controllers: [MenuGroupController],
})
export class MenuGroupModule {}
