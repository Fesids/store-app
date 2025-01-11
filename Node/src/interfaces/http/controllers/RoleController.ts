
import { RoleApplication } from "../../../application/role/RoleApplication";
import { controller, httpPost, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { inject } from "inversify";
import { CreateRoleDto } from "../../../application/role/dtos/CreateRoleDto";
import {Request, Response} from "express"


@controller("/api/v1/role")
export class RoleController implements interfaces.Controller{

    constructor(
        @inject(TYPES.RoleApplication)
        private readonly service: RoleApplication
    ){}

    @httpPost("/")
    async createAttach(@request() req: Request<{}, {}, CreateRoleDto>, @response() res: Response) {
        const {body} = req;

        const role = await this.service.createRole(body);

        return res.json({
            status: '201',
            message: "Success"
        })
    }
}