import { Db } from "mongodb";
import { ITaskRepository } from "../../domain/task/ITaskRepository";
import { Task } from "../../domain/task/Task";
import { Repository } from "./Repository";
import { inject } from "inversify";
import { Types } from "mysql2";
import { TYPES } from "../../constants/types";
import { IDataMapper } from "../../core/IDataMapper";


export class TaskRepository extends Repository<Task> implements ITaskRepository {

    constructor(
        @inject(TYPES.Db) private readonly db: Db,
        @inject(TYPES.TaskDataMapper) private readonly taskDataMapper: IDataMapper<Task>
    ) {
        super(db.collection('tasks'), taskDataMapper);
    }

}