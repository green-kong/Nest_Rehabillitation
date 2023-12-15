import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Seats } from '@libs/entity';

@Entity()
export class OrderTable extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column(() => Seats, { prefix: false })
    seats: Seats;

    @Column()
    empty: boolean;

    @Column({ nullable: true })
    groupTableId: number;

    public static from(seats: number): OrderTable {
        const newSeats = Seats.from(seats);
        const table = new OrderTable();
        table.seats = newSeats;
        table.empty = true;
        return table;
    }

    public changeToNotEmpty() {
        if (!this.empty) {
            throw new Error('비어있지 않은 테이블 입니다.');
        }
        this.empty = false;
    }

    public changeToEmpty() {
        if (this.empty) {
            throw new Error('이미 비어있는 테이블 입니다.');
        }
        this.empty = true;
    }

    public groupBy(groupTableId: number): void {
        if (this.groupTableId) {
            throw new Error('이미 그룹화 되어있는 테이블 입니다.');
        }
        this.groupTableId = groupTableId;
    }

    public getSeats() {
        return this.seats.seats;
    }
}
