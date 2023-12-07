import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreatUserRequest } from "../controller/dto/creat-user.request";
import { AppModule } from '../../app.module';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('회원정보를 저장한다.', async () => {
        // given
        const name = 'polo';
        const password = 'password';
        const creatUserRequest = new CreatUserRequest(name, password);

        // when
        const savedId = await service.creatUser(creatUserRequest);
        const response = await service.findUserById(savedId);

        // then
        expect(response.id).toEqual(savedId);
        expect(response.name).toEqual(name);
        expect(response.password).toEqual(password);
    });
});
