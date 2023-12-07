import { Inject, Injectable } from '@nestjs/common';
import { CreatUserRequest } from "../controller/dto/creat-user.request";
import { User } from "../entity/user.entity";
import { UserInformationResponse } from "../controller/dto/user-information.response";
import { IUserRepository } from '../entity/user.repository.interface';

@Injectable()
export class UsersService {
    constructor(@Inject('IUserRepository') private readonly userRepository: IUserRepository) {
    }

    async creatUser(createUserRequest: CreatUserRequest): Promise<number> {
        const { name, password } = createUserRequest;
        const user = User.of(name, password);
        const savedUser = await this.userRepository.save(user);
        return savedUser.id;
    }

    async findUserById(id: number): Promise<UserInformationResponse> {
        const user = await this.userRepository.findById(id);
        return UserInformationResponse.from(user);
    }
}
