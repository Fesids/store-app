import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { UserDto } from "./dtos/UserDto";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";
import { User } from "../../domain/user/User";


@injectable()
export class UserApplication {

    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,
    ){}

    async getAllUsers(): Promise<any[]> {
        const users = await this.userRepository.findAll();
        console.log(users)
        return users.map(user => new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password));
    }

    async getUserById(id: string): Promise<any | null> {
        const user = await this.userRepository.findOneById(id);

       
        if(!user) throw new AppError(`User with id ${id} couldn´t be retrieved`, 404);

        return new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password);
    }

    async createUser({email, firstName, lastName, password}: any): Promise<void> {

        const user = User.create({email, firstName, lastName, password});

        await this.userRepository.save(user);


    }

}