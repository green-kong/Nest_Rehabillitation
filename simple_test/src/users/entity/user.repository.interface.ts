import { User } from "./user.entity";

export interface IUserRepository {
    save(user: User): Promise<User>,

    findAll(): Promise<User[]>,

    findById(id: number): Promise<User>,

    update(user: User): void,

    deleteById(id: number): void;
}