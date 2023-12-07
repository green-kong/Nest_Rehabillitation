import { Injectable } from '@nestjs/common';
import { IUserRepository } from './user.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserTypeormRepository implements IUserRepository {

    constructor(@InjectRepository(User) private readonly repository: Repository<User>) {
    }

    async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    findAll(): Promise<User[]> {
        return Promise.resolve([]);
    }

    async findById(id: number): Promise<User> {
        // @ts-ignore
        return await this.repository.findOne({ where: { _id: id } })
    }

    update(user: User): void {
    }

    deleteById(id: number): void {
    }
}