import { MenuGroup } from './menu-group.entity';

describe('메뉴그룹 생성 테스트', () => {
    it('메뉴그룹을 생성한다.', () => {
        // given
        const name = '분식';

        // when
        const menuGroup = MenuGroup.from(name);

        // then
        expect(menuGroup.getName()).toEqual(name);
    });

    describe('menuGroup 이름으로 인한 예외발생 테스트', () => {
        test.each(['', null, undefined])(
            '%s을 이름으로 menuGroup를 생성하면 예외가 발생한다.',
            (param) => {
                // when & then
                expect(() => {
                    MenuGroup.from(param);
                }).toThrow(new Error('이름을 입력되지 않았습니다.'));
            },
        );

        test.each(['열글자가넘는이름테스트', '열두글자짜리로이름테스트'])(
            '열글자가 넘는 이름의 menuGroup를 생성하면 예외가 발생한다.',
            (overTenLengthName) => {
                // when & then
                expect(() => {
                    MenuGroup.from(overTenLengthName);
                }).toThrow(new Error('10글자 미만의 이름만 입력가능 합니다.'));
            },
        );
    });
});
