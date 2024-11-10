import { inject, } from "inversify";
import { controller, httpGet, httpPost, interfaces, request, response} from "inversify-express-utils";
import { TYPES } from "../../../constants/types";
import { TaskApplication } from "../../../application/task/TaskApplication";
import { NextFunction, Request, Response } from "express";
import { ITaskRepository } from "../../../domain/task/ITaskRepository";
import { Task } from "../../../domain/task/Task";
import { ok } from "../processors/response";
import { ParsedQs } from 'qs';
import {removeUnderscores} from '../../../utils/removeUnderscore'



@controller('/api/v1/tasks')
export class TaskController implements interfaces.Controller{

    constructor(
        @inject(TYPES.TaskApplication)
        private readonly service: TaskApplication,

        @inject(TYPES.TaskRepository)
        private readonly taskrepository: ITaskRepository
    ){}


    @httpPost('')
    async createTask(@request() req: Request, @response() res: Response, next: NextFunction) {
        try {
            const { title, description, completed, employees, departments, createdBy, createdAt, updatedAt } = req.body;
            await this.service.createTask({ title, description, completed, employees, departments, createdBy, createdAt, updatedAt });
            res.json({
                status: '201',
                message: 'Success'
            })
        } catch (error) {
            next(error);
        }

    }

    /*@httpGet('')
    async getTasksByDp(@request() req: Request, @response() res: Response, next: NextFunction){
        try{
            const criteria = req.query;
            console.log(criteria)
            const tasks = await this.service.getTasksByDepartments(criteria as Record<string, any>);

            console.log(tasks)

            return res.json(ok(tasks, ''))
        } catch(error) {
            next(error);
        }
    }*/

    @httpGet('')
    async getTasksByDp(@request() req: Request, @response() res: Response, next: NextFunction) {
        try {
            const criteria: Record<string, any> = { ...req.query };
    
            if (criteria.departments) {
                if (typeof criteria.departments === 'string') {
                    criteria.departments = [criteria.departments];
                } else if (Array.isArray(criteria.departments)) {
                    
                    criteria.departments = [...new Set(criteria.departments.filter((dep): dep is string => typeof dep === 'string'))];
                }
            }
    
         
            if (typeof criteria.completed === 'string') {
                criteria.completed = criteria.completed === 'true';
            }
    
            const tasks = await this.service.getTasksByCriterias(criteria);
            return res.json(ok(removeUnderscores(tasks), 'Success'));
        } catch (error) {
            next(error);
        }
    }

    
    @httpGet("/:id")
    async getTaskById(@request() req: Request, @response() res: Response, next: NextFunction) {
        try {
            const task = await this.service.getTaskById(req.params.id);
            return res.json(ok(task, `task with ${req.params.id} retrived successfully`))
        } catch (error) {
            next(error);
        }
    }
        

}