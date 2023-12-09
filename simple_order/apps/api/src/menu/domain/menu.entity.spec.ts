import { Menu } from './menu.entity';
import { MenuProduct } from './menu-product.entity';

describe('menu 테스트', () => {
    describe('menu 생성 테스트', () => {
        it('menu를 생성한다.', () => {
            // given
            const name = '떡순튀';
            const price = 10_000;
            const menuGroupId = 1;

            // when
            const menu = Menu.of(name, price, menuGroupId);

            // then
            expect(menu.getName()).toEqual(name);
            expect(menu.getPrice()).toEqual(price);
        });

        test.each(['열한글자짜리로이름짓기', '열두글자짜리로이름짓기기'])(
            '열글자가 넘는 이름으로 menu를 생성하면 예외가 발생한다',
            (name: string) => {
                // when & then
                expect(() => {
                    Menu.of(name, 2000, 2);
                }).toThrow(new Error('10글자 미만의 이름만 입력가능 합니다.'));
            },
        );

        test.each(['', null, undefined])(
            "'%s'을 이름으로 menu를 생성하면 예외가 발생한다.",
            (name: string) => {
                expect(() => {
                    Menu.of(name, 3000, 3);
                }).toThrow(new Error('이름을 입력되지 않았습니다.'));
            },
        );
    });

    describe('menu에 menuProduct를 추가한다.', () => {
        it('하나의 menuProduct를 추가한다.', () => {
            // given
            const menu = Menu.of('세트1', 16000, 2);
            const 짜장 = MenuProduct.of(1, 2);

            // when
            menu.addMenuProduct(짜장);

            // then
            expect(menu.menuProducts.length).toEqual(1);
            expect(menu.menuProducts).toContain(짜장);
        });

        it('여러개의 menuProduct를 추가한다.', () => {
            // given
            const menu = Menu.of('세트1', 22000, 2);
            const 짜장 = MenuProduct.of(1, 2);
            const 탕수육 = MenuProduct.of(2, 1);

            // when
            menu.addAllMenuProducts([짜장, 탕수육]);

            // then
            expect(menu.menuProducts.length).toEqual(2);
            expect(menu.menuProducts).toContain(짜장);
            expect(menu.menuProducts).toContain(탕수육);
        });
    });

    describe('menuProduct를 삭제 Test', () => {
        it('menuProduct를 menu에서 삭제한다.', () => {
            // given
            const menu = Menu.of('세트1', 22000, 2);
            const 짜장 = MenuProduct.of(1, 2);
            const 탕수육 = MenuProduct.of(2, 1);
            짜장.id = 1;
            탕수육.id = 2;
            menu.addAllMenuProducts([짜장, 탕수육]);

            // when
            menu.removeMenuProduct(짜장.id);

            // then
            expect(menu.menuProducts.length).toEqual(1);
            expect(menu.menuProducts).toContain(탕수육);
        });
    });
});
