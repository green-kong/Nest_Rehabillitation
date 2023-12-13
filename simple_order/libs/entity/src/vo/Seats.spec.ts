import { Seats } from '@libs/entity';

describe('seats 테스트', () => {
    it('seats 생성 테스트', () => {
        // given
        const number = 10;

        // when
        const seats = Seats.from(number);

        // then
        expect(seats.seats).toEqual(number);
    });

    test.each([0, -1])(
        '0이하의 seats를 생성하면 예외가 발생한다.',
        (number: number) => {
            // when & then
            expect(() => {
                Seats.from(number);
            }).toThrow(new Error('좌석 수는 0보다 커야합니다.'));
        },
    );
});
