import { User } from "./user.entity";

describe('user test', () => {

    it('user를 생성한다.', () => {
        // given
        const name: string = 'polo';
        const password: string = 'password';

        // when
        const user: User = User.of(name, password);

        // then
        expect(user.name).toBe(name);
        expect(user.password).toBe(password);
    });

    it('user의 비밀번호를 변경한다.', () => {
        // given
        const name: string = 'polo';
        const password: string = 'password';
        const newPassword: string = 'newPassword';
        const user: User = User.of(name, password);

        // when
        user.changePassword(password, newPassword);

        //then
        expect(user.password).toBe(newPassword);
    });

    it('비밀번호 변경 시 기존의 비밀번호가 일치하지 않으면 예외가 발생한다.', () => {
        // given
        const name: string = 'polo';
        const password: string = 'password';
        const newPassword: string = 'newPassword';
        const user: User = User.of(name, password);

        // when & then
        expect(() => {
            user.changePassword('wrongPassword', newPassword);
        }).toThrow(new Error('비밀번호가 일치하지 않습니다.'));
    });

    it('test', () => {
        // given
        const test = new Test('polo', 31, [1, 2, 3]);

        // when
        const { name, age, numbers } = test;

        // then
        expect(name).toBe('polo');
        expect(age).toBe(31);
        expect(numbers).toStrictEqual([1, 2, 3]);
    })
})

class Test {
    constructor(private _name: string, private _age: number, private _numbers: number[]) {
    }

    get name(): string {
        return this._name;
    }

    get age(): number {
        return this._age;
    }

    get numbers(): number[] {
        return this._numbers;
    }
}