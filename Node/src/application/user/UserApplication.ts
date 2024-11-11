import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { UserDto } from "./dtos/UserDto";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";
import { User } from "../../domain/user/User";
import { Pagination } from "../../shared/pagination/Pagination";


@injectable()
export class UserApplication {

    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,
    ){}

    async getAllUsers(): Promise<any[]> {
        const users = await this.userRepository.findAll();
        //console.log(users)
        return users.map(user => new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password, user.createdAt, user.updatedAt));
    }

    async getPaginetedUsers(criteria: Record<string, any>, pagination?: Pagination): Promise<any>{
        
        const users = await this.userRepository.findAllByParam(criteria, pagination);

        return users;
    }

    async getUserById(id: string): Promise<any | null> {
        const user = await this.userRepository.findOneById(id);

       
        if(!user) throw new AppError(`User with id ${id} couldn´t be retrieved`, 404);

        return new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password, user.createdAt, user.updatedAt);
    }

    async createUser({email, firstName, lastName, password}: any): Promise<void> {
        const createdAt = new Date();
        const updatedAt = new Date();
        const user = User.create({email, firstName, lastName, password, createdAt, updatedAt});

        await this.userRepository.save(user);


    }

    async updateUserById(id: string, updates: Partial<UserDto>): Promise<void> {
        updates.updatedAt = new Date();
        await this.userRepository.updateOneById(id, updates);

    }

}