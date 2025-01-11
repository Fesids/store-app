import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IUserRepository } from "../../domain/user/IUserRepository";
import { UserDto } from "./dtos/UserDto";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";
import { User } from "../../domain/user/User";
import { Pagination } from "../../shared/pagination/Pagination";
import { IRoleRepository } from "../../domain/role/IRoleRepository";


@injectable()
export class UserApplication {

    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: IUserRepository,

        @inject(TYPES.RoleRepository)
        private readonly roleRepository: IRoleRepository
    ){}

    async getAllUsers(): Promise<any[]> {
        const users = await this.userRepository.findAll();
        //console.log(users)
        return users.map(user => new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password, user.roles, user.createdAt, user.updatedAt));
    }

    async getPaginetedUsers(criteria: Record<string, any>, pagination?: Pagination): Promise<any>{
        
        const users = await this.userRepository.findAllByParam(criteria, pagination);

        return users;
    }

    async getUserById(id: string): Promise<any | null> {
        const user = await this.userRepository.findOneById(id);

       
        if(!user) throw new AppError(`User with id ${id} couldn´t be retrieved`, 404);

        return new UserDto(user.guid, user.email, user.firstname, user.lastname, user.password, user.roles, user.createdAt, user.updatedAt);
    }

    async createUser({email, firstName, lastName, password, roles}: any): Promise<void> {
        const createdAt = new Date();
        const updatedAt = new Date();

        const userRoles: string[] = [];
      
        if (!roles || roles.length === 0) {
          
          const basicRoleGuid = await this.roleRepository.findFieldValue('name', 'basic', 'guid');
          if (!basicRoleGuid) throw new AppError('Default "basic" role not found', 500);
          userRoles.push(basicRoleGuid);
        } else {
         
          for (const roleName of roles) {
            const roleGuid = await this.roleRepository.findFieldValue('name', roleName, 'guid');
            if (!roleGuid) throw new AppError(`Role "${roleName}" not found`, 404);
            userRoles.push(roleGuid);
          }
        }
      
        const user = User.create({email, firstName, lastName, password, createdAt, updatedAt, roles:userRoles});

        await this.userRepository.save(user);


    }

    async updateUserById(id: string, updates: Partial<UserDto>): Promise<void> {
        updates.updatedAt = new Date();
        await this.userRepository.updateOneById(id, updates);

    }

}