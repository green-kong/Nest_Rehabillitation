import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { UserMemoryRepository } from "./entity/user.memory.repository";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserTypeormRepository } from './entity/user.typeorm.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UsersService,
        { provide: 'IUserRepository', useClass: UserTypeormRepository }],
    controllers: [UsersController],
})
export class UsersModule {
}
