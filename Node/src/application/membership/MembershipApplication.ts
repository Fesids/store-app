import { inject, injectable } from "inversify";
import { TYPES } from "../../constants/types";
import { IDepartmentRepository } from "../../domain/department/IDepartmentRepository";
import { Department } from "../../domain/department/Department";
import { IMembershipRepository } from "../../domain/membership/IMembershipRepository";
import { CreateMembership, UpdateMembership } from "./dtos/MembershipDto";
import { Membership } from "../../domain/membership/Membership";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";

@injectable()
export class MembershipApplication {
    constructor(
        @inject(TYPES.MembershipRepository)
        private readonly membershipRepository: IMembershipRepository,

    ){}

    async create(data: CreateMembership): Promise<void> {
        const { companyId, userId, memberRole, departmentId} = data;
        const createdAt = new Date();
        const updatedAt = new Date();
      
        try {
          
            const membershipByUserId = await this.membershipRepository.findOneByParam({"userId": userId});

           

            if(membershipByUserId){
                throw new AppError("A employee with this GUID already exists", 400)
            }

            const membership = Membership.create({companyId, userId, departmentId,memberRole, createdAt, updatedAt});
      
         
          await this.membershipRepository.save(membership);
        } catch (error) {
          
          console.error('Error during membership creation:', error);
          throw error;
        }
      }

    async updateMembershipById(guid: string, updates:Partial<UpdateMembership>): Promise<void> {
      updates.updatedAt = new Date();
      this.membershipRepository.updateOneById(guid, updates)
    }
    
    
}