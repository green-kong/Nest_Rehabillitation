import { Column } from 'typeorm';

export class Seats {
    @Column()
    seats: number;

    public static from(seats: number): Seats {
        if (seats < 1) {
            throw Error('좌석 수는 0보다 커야합니다.');
        }
        const newSeats = new Seats();
        newSeats.seats = seats;
        return newSeats;
    }
}
