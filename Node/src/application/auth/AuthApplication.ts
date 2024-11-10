import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/User";
import { SignUpDto } from "./dtos/SignupDto";
import { loginUserDto } from "./dtos/LoginDto";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";
import { UserDto } from "../user/dtos/UserDto";
import { getHashPassword, verifyUserPassword, JwtPayloadExtended, getJwtToken } from "../../shared/authenticationUtil";


@injectable()
export class AuthApplication {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository
    ){}

    async signUpUser(data: SignUpDto): Promise<void>{
        const {email, firstName, lastName, password, rePassword} = data;

        const hashPass = await getHashPassword(password);

        const userExists = await this.userRepository.findOneByParam({email: email});

        if(userExists) throw new AppError(`User with ${email} already exists`, 404);


        if(password !== rePassword) throw new AppError('Password and rePassword didnt match', 404)

        const user = User.create({email, firstName, lastName, password: hashPass});

        await this.userRepository.save(user);
       
    }

    async loginUser(data: loginUserDto): Promise<any> {
        const {email, password} = data;

        const user = await this.userRepository.findOneByParam({email: email});

        
        if(!user) throw new AppError(`User with email ${email} couldn´t be retrieved`, 404);

        const authCheck = await verifyUserPassword(password, user.password);

        if(!authCheck) throw new AppError(`Password didn't match`, 404);

        const jwtPayload: JwtPayloadExtended = {
            guid: user.guid,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email

        };

        const token = getJwtToken(jwtPayload);

        const loggedUser = new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password);


        return {
            loggedUser,
            token
        }//new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password);

        
    }


}
