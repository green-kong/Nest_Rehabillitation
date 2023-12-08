import { Name } from './Name';

describe('Name 생성 테스트', () => {
    it('Name을 생성한다', () => {
        // given
        const string = '떡볶이';

        // when
        const name = Name.from(string);

        // then
        expect(name.name).toEqual(string);
    });

    test.each(['', null, undefined])(
        '%s로 Name을 생성하면 예외가 발생한다.',
        (param) => {
            // when & then
            expect(() => {
                Name.from(param);
            }).toThrow(new Error('이름을 입력되지 않았습니다.'));
        },
    );

    test.each(['열글자가넘는이름테스트', '열두글자짜리로이름테스트'])(
        '이름이 열글자가 초과하면 예외가 발생한다.',
        (overTenLengthName) => {
            // when & then
            expect(() => {
                Name.from(overTenLengthName);
            }).toThrow(new Error('10글자 미만의 이름만 입력가능 합니다.'));
        },
    );
});
