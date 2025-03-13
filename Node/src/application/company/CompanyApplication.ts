import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { ICompanyRepository } from "../../domain/company/ICompanyRepository";
import { createCompanyDto } from "./dtos/CompanyDto";
import { Company } from "../../domain/company/Company";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";

@injectable()
export class CompanyApplication {
    constructor(
        @inject(TYPES.CompanyRepository)
        private readonly companyRepository: ICompanyRepository,

       
    ){}

    async create(data: createCompanyDto): Promise<void> {
        const { name } = data;
        const createdAt = new Date();
        const updatedAt = new Date();
      
        try {
          
        
          const company = Company.create({
            name,
            createdAt,
            updatedAt,
            employeesCount: data.employeesCount? data.employeesCount: 0
          });
      
         
          await this.companyRepository.save(company);
        } catch (error) {
          
          console.error('Error during company creation:', error);
          throw error;
        }
      }


    async updateEmployeeCount(companyId: string, operation: string){

        const companyById = await this.companyRepository.findOneById(companyId);
        
        if(companyById === null){
            throw new AppError('Password and rePassword did not match', 404);
      
        }

        const {employeesCount} = companyById
        
        
        
        const updates = {employeesCount: operation === "sum"? employeesCount+1: employeesCount -1}

        await this.companyRepository.updateOneById(companyId, updates);
    }

    
    
    
}