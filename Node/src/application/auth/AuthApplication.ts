import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { User } from "../../domain/user/User";
import { SignUpDto } from "./dtos/SignupDto";
import { loginUserDto } from "./dtos/LoginDto";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";
import { UserDto } from "../user/dtos/UserDto";
import { getHashPassword, verifyUserPassword, JwtPayloadExtended, getJwtToken, saveCookie } from "../../shared/authenticationUtil";
import { IRoleRepository } from "../../domain/role/IRoleRepository";
import { IMembershipRepository } from "../../domain/membership/IMembershipRepository";


@injectable()
export class AuthApplication {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,

        @inject(TYPES.RoleRepository)
        private readonly roleRepository: IRoleRepository,

        @inject(TYPES.MembershipRepository)
        private readonly membershipRepository: IMembershipRepository
    ){}

    async signUpUser(data: SignUpDto): Promise<void> {
        const { email, firstName, lastName, password, rePassword, roles } = data;
        const createdAt = new Date();
        const updatedAt = new Date();
      
        try {
          
          const hashPass = await getHashPassword(password);
      
          console.log(hashPass)
          
          const userExists = await this.userRepository.findOneByParam({ email: email });
          if (userExists) throw new AppError(`User with ${email} already exists`, 404);
      
         
          if (password !== rePassword) throw new AppError('Password and rePassword did not match', 404);
      
          
          const userRoles: string[] = [];
      
          if (!roles || roles.length === 0) {
            
            const basicRoleGuid = await this.roleRepository.findFieldValue('name', 'basic', 'guid');
            //console.log(basicRoleGuid)
            if (!basicRoleGuid) throw new AppError('Default "basic" role not found', 500);
            userRoles.push(basicRoleGuid);
          } else {
           
            for (const roleName of roles) {
              const roleGuid = await this.roleRepository.findFieldValue('name', roleName, 'guid');
              if (!roleGuid) throw new AppError(`Role "${roleName}" not found`, 404);
              userRoles.push(roleGuid);
            }
          }
      
         
          const user = User.create({
            email,
            firstName,
            lastName,
            password: hashPass,
            createdAt,
            updatedAt,
            roles: userRoles, 
          });
      
         
          await this.userRepository.save(user);
        } catch (error) {
          
          console.error('Error during user signup:', error);
          throw error;
        }
      }
      
    async loginUser(data: loginUserDto): Promise<any> {
        const {email, password} = data;

        const user = await this.userRepository.findOneByParam({email: email});

        
        if(!user) throw new AppError(`User with email ${email} couldn´t be retrieved`, 404);

        const authCheck = await verifyUserPassword(password, user.password);

        if(!authCheck) throw new AppError(`Password didn't match`, 404);

        const membershipInfo = await this.membershipRepository.findOneByParam({"userId": user.guid})

       
        const jwtPayload: JwtPayloadExtended = {
            guid: user.guid,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            roles: user.roles,
            companyId: membershipInfo.companyId,
            departmentId: membershipInfo.departmentId
        };

        const token = getJwtToken(jwtPayload);


        const loggedUser = new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password, user.roles, user.createdAt, user.updatedAt);


        return {
            loggedUser,
            token
        }//new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password);

        
    }


}
