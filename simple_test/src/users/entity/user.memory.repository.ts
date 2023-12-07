import { IUserRepository } from "./user.repository.interface";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserMemoryRepository implements IUserRepository {

    private users: Map<number, User> = new Map();

    async save(user: User): Promise<User> {
        const size: number = this.users.size;
        user.id = size + 1;
        this.users.set(user.id, user);
        return user;
    }

    deleteById(id: number): void {
        this.users.delete(id);
    }

    async findAll(): Promise<User[]> {
        return [...this.users.values()];
    }

    async findById(id: number): Promise<User> {
        return this.users.get(id);
    }

    update(user: User): void {
        this.users.set(user.id, user);
    }
}
