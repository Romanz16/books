import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
    constructor(
        public id: string,
        public login: string,
        public password: string,
        public role: string,
    ) { }
}
