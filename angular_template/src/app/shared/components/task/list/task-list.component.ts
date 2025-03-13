import { Component, inject, OnInit } from "@angular/core";
import { PaginatedListComponent } from "../../paginated/list/paginated-list.component";
import { PaginatedResponse } from "../../interfaces/paginatedResponse";
import { TaskModel } from "../../../../models/task.model";
import { TaskService } from "../../../../services/task.service";
import { response } from "express";
import { CommonModule } from "@angular/common";
import { filter, Observable, take } from "rxjs";
import { Route, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectUser } from "../../../../store/selectors/auth.selector";
import { isUserWithGuid } from "../../../utils/userValidation";

@Component({
    standalone: true,
    selector: "app-task-list",
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss'],
    imports: [PaginatedListComponent, CommonModule]
})
export class TaskListcomponent implements OnInit{

        tasks$: Observable<PaginatedResponse<TaskModel>>;
        private readonly store = inject(Store)
        
        constructor(private taskService: TaskService, private router:Router) {
          this.tasks$ = this.taskService.tasks$;
        }

        user$ = this.store.select(selectUser)

      
       
          goToTask(taskId: string): void {
            this.router.navigate([`/tarefa/${taskId}`])
          }

          ngOnInit(): void {
            this.user$.pipe(
              filter(isUserWithGuid), 
              take(1)
            ).subscribe(user => {
              console.log("UserHome: ", user);
              
              this.taskService.loadPaginatedTasks({}, 1, 5, undefined, user.guid);
            });

             
           
        }
    
        onPageChange(newPage: number): void {
          this.user$.pipe(
            filter(isUserWithGuid),
            take(1)
          ).subscribe(user => {
            this.taskService.loadPaginatedTasks({}, newPage, 5,undefined, user.guid);
          });
             
        }
      



}