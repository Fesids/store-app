import { inject, } from "inversify";
import { controller, httpPost, interfaces, request, response} from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { TaskApplication } from "../../../application/task/TaskApplication";
import { Request, Response } from "express";
import { ITaskRepository } from "../../../domain/task/ITaskRepository";
import { Task } from "../../../domain/task/Task";


@controller('/api/v1/tasks')
export class TaskController implements interfaces.Controller{

    constructor(
        @inject(TYPES.TaskApplication)
        private readonly service: TaskApplication,

        @inject(TYPES.TaskRepository)
        private readonly taskrepository: ITaskRepository
    ){}


    @httpPost('/')
    async createTask(@request() req: Request, @response() res: Response) {
        const {body} = req;

        const task = Task.create(body);

        
        //await this.taskrepository.save(task);
        const user = this.service.createTask(body);

        res.json({
            status: '000',
            message: 'Success'
        })

    }

}