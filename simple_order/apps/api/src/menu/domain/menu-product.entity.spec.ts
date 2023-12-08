import { MenuProduct } from './menu-product.entity';

describe('menuProduct 테스트', () => {
    it('menuProduct를 생성한다.', () => {
        // given
        const productId = 1;
        const quantity = 10;

        // when
        const menuProduct = MenuProduct.of(productId, quantity);

        // then
        expect(menuProduct.productId).toEqual(productId);
        expect(menuProduct.getQuantity()).toEqual(quantity);
    });

    test.each([-1, 0])(
        '수량이 0 이하인 menuProduct를 생성하면 예외가 발생한다.',
        (quantity: number) => {
            // when & then
            const productId = 1;
            expect(() => {
                MenuProduct.of(productId, quantity);
            }).toThrow(new Error('수량은 0보다 커야합니다.'));
        },
    );
});
