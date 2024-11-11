import { Component, OnInit } from "@angular/core";
import { PaginatedListComponent } from "../../paginated/list/paginated-list.component";
import { PaginatedResponse } from "../../interfaces/paginatedResponse";
import { TaskModel } from "../../../../store/models/task.model";
import { TaskService } from "../../../../services/task.service";
import { response } from "express";

@Component({
    standalone: true,
    selector: "app-task-list",
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    imports: [PaginatedListComponent]
})
export class TaskListcomponent implements OnInit{

    tasks: PaginatedResponse<TaskModel> = {data: [], total: 0, page: 1, pageSize: 10};
    criteria = {};

    constructor(private taskService: TaskService) {}

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
        this.loadTasks()
        console.log(this.tasks)
    }

    loadTasks() {
        this.taskService.retrievePaginatedTasks(this.criteria, this.tasks.page, this.tasks.pageSize)
        .subscribe(response => this.tasks = response.data? response.data: {} as PaginatedResponse<any> );
    }

    onPageChange(newPage: number) {
        this.tasks.page = newPage;
        this.loadTasks();
    }




}