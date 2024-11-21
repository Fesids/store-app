import { Component, OnInit } from "@angular/core";
import { PaginatedListComponent } from "../../paginated/list/paginated-list.component";
import { PaginatedResponse } from "../../interfaces/paginatedResponse";
import { TaskModel } from "../../../../store/models/task.model";
import { TaskService } from "../../../../services/task.service";
import { response } from "express";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";

@Component({
    standalone: true,
    selector: "app-task-list",
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    imports: [PaginatedListComponent, CommonModule]
})
export class TaskListcomponent implements OnInit{

        tasks$: Observable<PaginatedResponse<TaskModel>>;

        constructor(private taskService: TaskService) {
          this.tasks$ = this.taskService.tasks$;
        }
      
        /*ngOnInit(): void {
          this.taskService.loadTasks();
          console.log(this.tasks$) // this is my debug
        }*/
        
          ngOnInit(): void {
            const defaultEmployeeId = "86db2f60-bbd8-4ad8-b80d-4ea84e37865f";
            this.taskService.loadPaginatedTasks({}, 1, 5, defaultEmployeeId); 
            this.tasks$.subscribe(tasks => console.log('Tasks updated:', tasks));
        }
    
        onPageChange(newPage: number): void {
            const defaultEmployeeId = "86db2f60-bbd8-4ad8-b80d-4ea84e37865f";
            this.taskService.loadPaginatedTasks({}, newPage, 5, defaultEmployeeId); 
        }
          

        /*onPageChange(newPage: number): void {
          this.taskService.loadTasks({}, newPage);
        }*/




}