import { Quantity } from '@libs/entity';

describe('quantity 테스트', () => {
    it('quantity 생성 테스트', () => {
        // given
        const number = 10;

        // when
        const quantity = Quantity.from(number);

        // then
        expect(quantity.quantity).toEqual(number);
    });

    test.each([0, -1])(
        '0이하의 quantity를 생성하면 예외가 발생한다.',
        (number: number) => {
            // when & then
            expect(() => {
                Quantity.from(number);
            }).toThrow(new Error('수량은 0보다 커야합니다.'));
        },
    );
});
