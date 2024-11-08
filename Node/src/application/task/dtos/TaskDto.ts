
export class TaskDto{
    constructor(
        public guid: string,
        public title: string,
        public description: string,
        public completed: boolean,
        public employees: Array<string>,
        public createdBy: Array<string>,
        public departments: Array<string>,
        public createdAt: Date,
        public updatedAt: Date,
    ){

    }
}