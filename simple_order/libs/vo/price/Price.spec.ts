import { Price } from './Price';

describe('Price 생성 테스트', () => {
    it('Price가 정상적으로 생성된다.', () => {
        // given
        const number: number = 10_000;

        // when
        const price = Price.from(number);

        // then
        expect(price.price).toEqual(number);
    });

    test.each([0, -1])(
        '0이하로 Price 생성 시 예외가 발생한다. (input = %d)',
        (subZeroNumber) => {
            // when & then
            expect(() => {
                Price.from(subZeroNumber);
            }).toThrow(new Error('가격은 0보다 커야합니다.'));
        },
    );
});
