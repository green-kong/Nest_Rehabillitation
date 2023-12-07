import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    private _id: number;

    @Column()
    private _name: string;

    @Column()
    private _password: string;

    static of(name: string, password: string) {
        const user = new User();
        user._name = name;
        user._password = password;
        return user;
    }

    changePassword(currentPassword: string, newPassword: string): void {
        if (this._password !== currentPassword) {
            throw new Error('비밀번호가 일치하지 않습니다.');
        }
        this._password = newPassword;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get password(): string {
        return this._password;
    }

    set id(value: number) {
        this._id = value;
    }
}