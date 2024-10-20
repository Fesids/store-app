import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/User";
import { SignUpDto } from "./dtos/SignupDto";
import { loginUserDto } from "./dtos/LoginDto";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";
import { UserDto } from "../user/dtos/UserDto";


@injectable()
export class AuthApplication {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository
    ){}

    async signUpUser(data: SignUpDto): Promise<void>{
        const {email, firstName, lastName, password, rePassword} = data;
        const user = User.create({email, firstName, lastName, password});

        await this.userRepository.save(user);
       
    }

    async loginUser(data: loginUserDto): Promise<any> {
        const {email, password} = data;
        const user = await this.userRepository.findOneByParam({email: email});

        
        if(!user) throw new AppError(`User with email ${email} couldn´t be retrieved`, 404);

        return new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password);

        
    }


}