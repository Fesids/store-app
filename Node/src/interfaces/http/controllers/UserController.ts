import { inject, } from "inversify";
import {interfaces} from "inversify-express-utils";
import { controller, httpGet, request, response, httpPost } from "inversify-express-utils";
import {Request, Response} from "express";

import { TYPES } from "../../../constants/types";
import { UserApplication } from "../../../application/user/UserApplication";
import { json } from "body-parser";
import { ok } from "../processors/response";


@controller('/api/v1/users')
export class UserController implements interfaces.Controller{

    constructor(
        @inject(TYPES.UserApplication)
        private readonly service: UserApplication
    ){}

    @httpGet("/teste")
    async getTeste(@request() req: Request, @response() res: Response) {
        console.log("Teste endpoint hit");
        return res.json("Ok user")
    }

    @httpGet('/')
    async getAllUsers(@request() req: Request, @response() res: Response) {
        const users = await this.service.getAllUsers();

        return res.json(ok(users, 'All users successfully retrieved'))
    }

    @httpGet('/:id')
    async getUserById(@request() req: Request, @response() res: Response) {
        const user = await this.service.getUserById(req.params.id);
        return res.json(ok(user, `User with ${req.params.id} retrived successfully`))
    }

    @httpPost('/')
    async createUser(@request() req: Request, @response() res: Response) {
        const {body} = req;
        const user = this.service.createUser(body);

        return res.json({
            status: '000',
            message: 'Success'
        })
    }

} 















