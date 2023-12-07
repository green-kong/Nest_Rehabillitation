import { User } from "../../entity/user.entity";

export class UserInformationResponse {
    constructor(private _id: number, private _name: string, private _password: string) {
    }

    public static from(user: User): UserInformationResponse {
        const {id, name, password} = user;
        return new UserInformationResponse(id, name, password);
    }


    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get password(): string {
        return this._password;
    }
}