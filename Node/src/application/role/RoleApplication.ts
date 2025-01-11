import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IRoleRepository } from "../../domain/role/IRoleRepository";
import { CreateRoleDto } from "./dtos/CreateRoleDto";
import { Role } from "../../domain/role/Role";
import { Task } from "../../domain/task/Task";


@injectable()
export class RoleApplication {
    constructor(
        @inject(TYPES.RoleRepository)
        private readonly roleRepository: IRoleRepository
    ){}

     async createRole({name, description, active}: CreateRoleDto): Promise<void> {
        const role = Role.create({name, description, active})
       
        await this.roleRepository.save(role);
    
    }

    

}