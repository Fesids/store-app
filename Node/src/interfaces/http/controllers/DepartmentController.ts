
import { RoleApplication } from "../../../application/role/RoleApplication";
import { controller, httpGet, httpPost, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { inject } from "inversify";
import { CreateRoleDto } from "../../../application/role/dtos/CreateRoleDto";
import {Request, Response} from "express"
import { CompanyApplication } from "../../../application/company/CompanyApplication";
import { createCompanyDto } from "../../../application/company/dtos/CompanyDto";
import { DepartmentApplication } from "../../../application/department/DepartmentApplication";
import { CreateDepartmentDto } from "../../../application/department/dtos/DepartmentDto";
import { ok } from "../processors/response";
import { removeUnderscores } from "../../../shared/removeUnderscore";


@controller("/api/v1/department")
export class DepartmentController implements interfaces.Controller{

    constructor(
        @inject(TYPES.DepartmentApplication)
        private readonly service: DepartmentApplication
    ){}

    @httpGet("/:dept_id")
    async getDepartmentById(@request() req: Request, @response() res: Response) {
        const {params} = req;

        try{
            const department = await this.service.getById(params.dept_id)

            return res.json(ok(removeUnderscores(department), "Department retrived sucessfully"))

        } catch(error){
            //console.log(error)
            return res.status(404).json({error: "Something went wrong"})
        
        }
        
        
    }

    @httpPost("/")
    async createDepartment(@request() req: Request<{}, {}, CreateDepartmentDto>, @response() res: Response) {
        const {body} = req;

        const department = await this.service.create(body);

        return res.json({
            status: '201',
            message: "Success"
        })
    }
}