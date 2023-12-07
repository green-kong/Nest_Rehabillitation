import { UserMemoryRepository } from "./user.memory.repository";
import { User } from "./user.entity";
import { IUserRepository } from "./user.repository.interface";

describe('인메모리 user 리포지토리 테스트', () => {
    let userRepository: IUserRepository;

    beforeEach(() => {
        userRepository = new UserMemoryRepository();
    })


    it('user를 저장한다.', async () => {
        // given
        const name = 'polo';
        const password = '1234';
        const user = User.of(name, password);

        // when
        const savedUser = await userRepository.save(user);

        // then
        expect(savedUser.id).toEqual(1);
        expect(savedUser.name).toBe(name);
        expect(savedUser.password).toBe(password);
    });

    it('id를 통해 user를 조회한다.', async () => {
        // given
        const name = 'polo';
        const password = '1234';
        const user = User.of(name, password);
        const savedUser = await userRepository.save(user);

        // when
        const foundUser = await userRepository.findById(savedUser.id);

        // then
        expect(foundUser).toEqual(user);
    });
})