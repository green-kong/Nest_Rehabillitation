import { Module } from '@nestjs/common';
import { MenuGroupService } from './service/menu-group.service';
import { MenuGroupRepository } from './domain/menu-group.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([MenuGroupRepository])],
    providers: [MenuGroupService, MenuGroupRepository],
})
export class MenuGroupModule {}
