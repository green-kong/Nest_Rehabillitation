export class Name {
    name: string;

    public static from(name: string): Name {
        if (!name) {
            throw Error('이름을 입력되지 않았습니다.');
        }

        if (name.length > 10) {
            throw Error('10글자 미만의 이름만 입력가능 합니다.');
        }

        const newName = new Name();
        newName.name = name;
        return newName;
    }
}
