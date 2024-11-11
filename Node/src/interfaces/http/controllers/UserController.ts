import { inject, } from "inversify";
import {httpPut, interfaces} from "inversify-express-utils";
import { controller, httpGet, request, response, httpPost } from "inversify-express-utils";
import {NextFunction, Request, Response} from "express";

import { TYPES } from "../../../constants/types";
import { UserApplication } from "../../../application/user/UserApplication";
import { json } from "body-parser";
import { ok, updated } from "../processors/response";
import { Pagination } from "../../../shared/pagination/Pagination";
import { removeUnderscores, removeUnderscoresFromPaginated } from "../../../shared/removeUnderscore";


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
    async getPaginetedUsers(@request() req: Request, @response() res: Response){
        const criteria: Record<string, any> = { ...req.query };
        const page = parseInt(req.query.page as string) || 1;
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const pagination: Pagination = {page, pageSize};

        delete criteria.page;
        delete criteria.pageSize;

        const users = await this.service.getPaginetedUsers(criteria ,pagination);
        users.data = removeUnderscoresFromPaginated(users.data)
        return res.json(ok(users, 'Success'));
    }

    @httpGet('/all')
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

    @httpPut('/:id')
    async updateTaskById(@request() req: Request, @response() res: Response, next: NextFunction){
        try{
            const id = req.params.id;
            const updates = req.body;
            //updates.put({updatedAt: new Date()});
            await this.service.updateUserById(id, updates);
            return res.json(updated({}, `User with GUID ${id} updated successfully`));

        } catch(error) {
            next(error);
        }
    }

} 















