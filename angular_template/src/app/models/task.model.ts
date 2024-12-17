
export interface TaskModel {
    guid: string,
    title: string,
    description: string,
    completed: boolean,
    employees: Array<string>,
    createdBy: Array<string>,
    departments: Array<string>,
    createdAt: Date,
    updatedAt: Date,
}