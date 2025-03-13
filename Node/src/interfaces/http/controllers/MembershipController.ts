
import { RoleApplication } from "../../../application/role/RoleApplication";
import { controller, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { inject } from "inversify";
import { CreateRoleDto } from "../../../application/role/dtos/CreateRoleDto";
import {NextFunction, Request, Response} from "express"
import { CompanyApplication } from "../../../application/company/CompanyApplication";
import { createCompanyDto } from "../../../application/company/dtos/CompanyDto";
import { DepartmentApplication } from "../../../application/department/DepartmentApplication";
import { CreateDepartmentDto } from "../../../application/department/dtos/DepartmentDto";
import { MembershipApplication } from "../../../application/membership/MembershipApplication";
import { CreateMembership } from "../../../application/membership/dtos/MembershipDto";
import { updated } from "../processors/response";


@controller("/api/v1/membership")
export class MembershipController implements interfaces.Controller{

    constructor(
        @inject(TYPES.MembershipApplication)
        private readonly service: MembershipApplication
    ){}

    @httpPost("/")
    async createDepartment(@request() req: Request<{}, {}, CreateMembership>, @response() res: Response) {
        const {body} = req;

        const membership = await this.service.create(body);

        return res.json({
            status: '201',
            message: "Success"
        })
    }

    @httpPut('/:id')
    async updateTaskById(@request() req: Request, @response() res: Response, next: NextFunction){
            try{
                const id = req.params.id;
                const updates = req.body;
                //updates.put({updatedAt: new Date()});
                await this.service.updateMembershipById(id, updates);
                return res.json(updated({}, `Membership with GUID ${id} updated successfully`));
    
            } catch(error) {
                next(error);
            }
        }
}