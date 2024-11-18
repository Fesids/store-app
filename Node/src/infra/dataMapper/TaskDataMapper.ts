import { injectable } from "inversify";
import { IDataMapper } from "../../core/IDataMapper";
import { ITaskProps, Task } from "../../domain/task/Task";
import { User } from "../../domain/user/User";


@injectable()
export class TaskDataMapper implements IDataMapper<Task>{
    toDomain(dalEntity: any): Task {
        const {
            guid,
            title,
            description,
            completed,
            employees,
            createdBy,
            completedBy,
            departments,
            createdAt,
            updatedAt,


        } = dalEntity;

        return Task.create({title, description, completed, employees, createdBy, completedBy,departments, createdAt, updatedAt}, guid)
    }
    toDalEntity(entity: Task) {
        return {
            guid: entity.guid,
            title: entity.title,
            description: entity.description,
            completed: entity.completed,
            employees: entity.employees,
            createdBy: entity.createdBy,
            completedBy: entity.createdBy,
            departments: entity.departments,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        }
    }
    
}