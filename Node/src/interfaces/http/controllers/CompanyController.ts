
import { RoleApplication } from "../../../application/role/RoleApplication";
import { controller, httpPatch, httpPost, interfaces, params, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { inject } from "inversify";
import { CreateRoleDto } from "../../../application/role/dtos/CreateRoleDto";
import {Request, Response} from "express"
import { CompanyApplication } from "../../../application/company/CompanyApplication";
import { createCompanyDto } from "../../../application/company/dtos/CompanyDto";


@controller("/api/v1/company")
export class CompanyController implements interfaces.Controller{

    constructor(
        @inject(TYPES.CompanyApplication)
        private readonly service: CompanyApplication
    ){}

    @httpPost("/")
    async createCompany(@request() req: Request<{}, {}, createCompanyDto>, @response() res: Response) {
        const {body} = req;

        const company = await this.service.create(body);

        return res.json({
            status: '201',
            message: "Success"
        })
    }

    @httpPatch("/:companyId")
    async updateCompanyEmployeesCount(@request() req: Request, @response() res: Response) {
        const { operation } = req.query;

   
    if (typeof operation !== 'string') {
        return res.status(400).json({ error: "Invalid or missing 'operation' query parameter" });
    }

    try {
        ///console.log(operation)
        await this.service.updateEmployeeCount(req.params.companyId, operation);
        return res.status(200).json({ message: "Employee count updated successfully" });
    } catch (error) {
        console.error("Error updating employee count:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
    
    }
}