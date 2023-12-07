export class CreatUserRequest {
    constructor(private _name: string, private _password: string) {
    }


    get name(): string {
        return this._name;
    }

    get password(): string {
        return this._password;
    }
}