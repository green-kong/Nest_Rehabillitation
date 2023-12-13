import { OrderTable } from './table.entity';

describe('Table 도메인 테스트', () => {
    describe('테이블 생성 테스트', () => {
        it('테이블을 생성한다.', () => {
            // given
            const seats = 4;

            // when
            const table = OrderTable.from(seats);

            // then
            expect(table.getSeats()).toEqual(seats);
        });

        test.each([0, -1])(
            '테이블의 좌석 수가 0이하인 경우 예외가 발생한다. input = %s',
            (subZeroSeats) => {
                // when & then
                expect(() => {
                    OrderTable.from(subZeroSeats);
                }).toThrow(Error('좌석 수는 0보다 커야합니다.'));
            },
        );
    });

    describe('empty 변경 테스트', () => {
        it('table의 empty를 false로 변경한다.', () => {
            // given
            const orderTable = OrderTable.from(4);

            // when
            orderTable.changeToNotEmpty();

            // then
            expect(orderTable.empty).toEqual(false);
        });

        it('table의 empty를 false로 바꾸려 할때, 이미 false인 경우 예외가 발생한다.', () => {
            // given
            const orderTable = OrderTable.from(4);
            orderTable.changeToNotEmpty();

            // when & then
            expect(() => {
                orderTable.changeToNotEmpty();
            }).toThrow(Error('비어있지 않은 테이블 입니다.'));
        });

        it('table의 empty를 true로 변경한다.', () => {
            // given
            const orderTable = OrderTable.from(4);
            orderTable.changeToNotEmpty();

            //when
            orderTable.changeToEmpty();

            //then
            expect(orderTable.empty).toEqual(true);
        });

        it('table의 empty를 true로 바꾸려 할때, 이미 true인 경우 예외가 발생한다.', () => {
            // given
            const orderTable = OrderTable.from(4);

            // when & then
            expect(() => {
                orderTable.changeToEmpty();
            }).toThrow(Error('이미 비어있는 테이블 입니다.'));
        });
    });
});
