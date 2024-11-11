import { injectable , inject} from "inversify";
import { TYPES } from "../../constants/types";
import { ITaskRepository } from "../../domain/task/ITaskRepository";
import { TaskDto } from "./dtos/TaskDto";
import { Task } from "../../domain/task/Task";
import { AppError } from "../../interfaces/http/middlewares/ErrorHandler";
import { Pagination } from "../../shared/pagination/Pagination";


@injectable()
export class TaskApplication{

    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskrepository: ITaskRepository
        
    ){

    }

    async createTask({title, description, completed, employees, departments, createdBy}: any): Promise<void> {

        const createdAt = new Date();
        const updatedAt = new Date();
        const task = Task.create({title, description, completed, employees, createdBy, departments, createdAt, updatedAt});
        
       
        await this.taskrepository.save(task);

    }

    async getTasksByCriterias(criteria: Record<string, any>, pagination?: Pagination): Promise<any> {

        const tasks = await this.taskrepository.findAllByParam(criteria, pagination);

        return tasks;
    }

    async getTaskById(id: string): Promise<any | null>{

        const task = await this.taskrepository.findOneById(id);

        if(!task) throw new AppError(`Task with id ${id} couldn´t be retrieved`, 404);

        return new TaskDto(task.guid, task.title, task.description, task.completed, task.employees, task.createdBy, task.departments, task.createdAt, task.updatedAt);


    }

    async updateTaskById(id: string, updates: Partial<TaskDto>): Promise<void> {
        updates.updatedAt = new Date();
        await this.taskrepository.updateOneById(id, updates);

    }

}