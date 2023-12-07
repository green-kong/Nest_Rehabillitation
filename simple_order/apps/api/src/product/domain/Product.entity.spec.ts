import { Product } from './Product.entity';

describe('Product 생성 테스트', () => {
    it('product를 생성한다.', () => {
        // given
        const name = '떡볶이';
        const price = 4000;

        // when
        const product = Product.of(name, price);

        // then
        expect(product.getName()).toEqual(name);
        expect(product.getPrice()).toEqual(price);
    });

    describe('이름으로 인한 예외발생 테스트', () => {
        test.each(['', null, undefined])(
            '%s을 이름으로 product를 생성하면 예외가 발생한다.',
            (param) => {
                // given
                const price = 2000;

                // when & then
                expect(() => {
                    Product.of(param, price);
                }).toThrow(new Error('이름을 입력되지 않았습니다.'));
            },
        );

        test.each(['열글자가넘는이름테스트', '열두글자짜리로이름테스트'])(
            '열글자가 넘는 이름의 product를 생성하면 예외가 발생한다.',
            (overTenLengthName) => {
                // given
                const price = 2000;

                // when & then
                expect(() => {
                    Product.of(overTenLengthName, price);
                }).toThrow(new Error('10글자 미만의 이름만 입력가능 합니다.'));
            },
        );
    });

    describe('price로 인한 예외발생 테스트', () => {
        test.each([0, -1])(
            '0이하로 Price 생성 시 예외가 발생한다. (input = %d)',
            (subZeroNumber) => {
                // given
                const name = '튀김';

                // when & then
                expect(() => {
                    Product.of(name, subZeroNumber);
                }).toThrow(new Error('가격은 0보다 커야합니다.'));
            },
        );
    });
});
