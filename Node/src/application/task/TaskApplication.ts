import { injectable , inject} from "inversify";
import { TYPES } from "../../constants/types";
import { ITaskRepository } from "../../domain/task/ITaskRepository";
import { TaskDto } from "./dtos/TaskDto";
import { Task } from "../../domain/task/Task";


@injectable()
export class TaskApplication{

    constructor(
        @inject(TYPES.TaskRepository)
        private readonly taskrepository: ITaskRepository

    ){

    }

    async createTask({title, description, completed, employees, departments, createdBy, createdAt, updatedAt}: any): Promise<void> {

        const task = Task.create({title, description, completed, employees, createdBy, departments, createdAt, updatedAt});

        await this.taskrepository.save(task);


    }

}