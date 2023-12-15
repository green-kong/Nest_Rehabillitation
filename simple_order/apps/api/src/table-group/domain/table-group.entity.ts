import { BaseEntity, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TableGroup extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
