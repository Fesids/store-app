import { inject, } from "inversify";
import { controller, httpPost, interfaces, request, response} from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { TaskApplication } from "../../../application/task/TaskApplication";
import { Request, Response } from "express";


@controller('/api/v1/tasks')
export class TaskController implements interfaces.Controller{

    constructor(
        @inject(TYPES.UserApplication)
        private readonly service: TaskApplication
    ){}


    @httpPost('/')
    async createUser(@request() req: Request, @response() res: Response) {
        const {body} = req;
        const user = this.service.createTask(body);

        res.json({
            status: '000',
            message: 'Success'
        })

    }

}