export class UserDto {
    constructor(
        public guid: string,
        public email: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public roles: Array<string>,
        public createdAt: Date,
        public updatedAt: Date,
    ){}
}