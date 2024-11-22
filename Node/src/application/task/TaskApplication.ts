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
        const completedBy = "";
        const task = Task.create({title, description, completed, employees, createdBy, completedBy, departments, createdAt, updatedAt});
        
       
        await this.taskrepository.save(task);

    }

    async getTasksByCriterias(criteria: Record<string, any>, pagination?: Pagination): Promise<any> {

        const tasks = await this.taskrepository.findAllByParams(criteria, pagination);

        return tasks;
    }

    async getTasksByParam(param: string, value: any): Promise<any> {

        const tasks = await this.taskrepository.findAllByParam(param, value);

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

    private calculatePercentageChange(current: number, previous: number): number {
        if (previous === 0) {
          return current === 0 ? 0 : 100;
        }
        return ((current - previous) / previous) * 100;
      }

    async getTaskStatisticsByEmployee(
        employeeId: string
      ): Promise<any> {
        const now = new Date();
        const firstDayOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const firstDayOfLastMonth = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          1
        );
        const lastDayOfLastMonth = new Date(
          now.getFullYear(),
          now.getMonth(),
          0,
          23,
          59,
          59
        );
      
        
        const tasksCreatedThisMonth = await this.taskrepository.countByCriteria({
          employees: { $in: [employeeId] },
          createdAt: { $gte: firstDayOfThisMonth },
        });
      
        const tasksCreatedLastMonth = await this.taskrepository.countByCriteria({
          employees: { $in: [employeeId] },
          createdAt: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth },
        });
      
        const taskCreationChange = this.calculatePercentageChange(
          tasksCreatedThisMonth,
          tasksCreatedLastMonth
        );
      
        
        const tasksCompletedThisMonth = await this.taskrepository.countByCriteria({
          employees: { $in: [employeeId] },
          completed: true,
          updatedAt: { $gte: firstDayOfThisMonth },
        });
      
        const tasksCompletedLastMonth = await this.taskrepository.countByCriteria({
          employees: { $in: [employeeId] },
          completed: true,
          updatedAt: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth },
        });
      
        const taskCompletionChange = this.calculatePercentageChange(
          tasksCompletedThisMonth,
          tasksCompletedLastMonth
        );
      
        
        const tasksPendingThisMonth = await this.taskrepository.countByCriteria({
          employees: { $in: [employeeId] },
          completed: false,
          updatedAt: { $gte: firstDayOfThisMonth },
        });
      
        const tasksPendingLastMonth = await this.taskrepository.countByCriteria({
          employees: { $in: [employeeId] },
          completed: false,
          updatedAt: { $gte: firstDayOfLastMonth, $lte: lastDayOfLastMonth },
        });
      
        const taskPendingChange = this.calculatePercentageChange(
          tasksPendingThisMonth,
          tasksPendingLastMonth
        );
      
        return {
          employeeId,
          created: {
            thisMonth: tasksCreatedThisMonth,
            lastMonth: tasksCreatedLastMonth,
            change: taskCreationChange,
          },
          completed: {
            thisMonth: tasksCompletedThisMonth,
            lastMonth: tasksCompletedLastMonth,
            change: taskCompletionChange,
          },
          pending: {
            thisMonth: tasksPendingThisMonth,
            lastMonth: tasksPendingLastMonth,
            change: taskPendingChange,
          },
        };
      }
      

}