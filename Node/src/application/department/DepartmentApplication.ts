import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IDepartmentRepository } from "../../domain/department/IDepartmentRepository";
import { CreateDepartmentDto } from "./dtos/DepartmentDto";
import { Department } from "../../domain/department/Department";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";

@injectable()
export class DepartmentApplication {
    constructor(
        @inject(TYPES.DepartmentRepository)
        private readonly departmentRepository: IDepartmentRepository,

       
    ){}

    async getById(guid: string): Promise<Department> {

      const department = await this.departmentRepository.findOneById(guid);

      if(!department){
        throw new AppError(`Department with id ${guid} doesn't exists`, 404);
        
      }

      return department;
    }

    async create(data: CreateDepartmentDto): Promise<void> {
        const { name, companyId, description, supervisors, gestor} = data;
        const createdAt = new Date();
        const updatedAt = new Date();
      
        try {
          
        
          const department = Department.create({name, companyId, description, supervisors, gestor, createdAt, updatedAt});
      
         
          await this.departmentRepository.save(department);
        } catch (error) {
          
          console.error('Error during department creation:', error);
          throw error;
        }
      }
    
    
}