import { Component, inject, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../../http/api.service";
import { catchError, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { BoxComponent } from "../../shared/components/boxComponent/box.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { HeaderComponent } from "../../shared/layout/header.component";
import { TaskListcomponent } from "../../shared/components/task/list/task-list.component";
import { TaskListContainerComponent } from "../../shared/components/task/list-container/task-list-container.component";
import { TaskChartComponent } from "../../shared/charts/task-chart/task-chart.component";


@Component({
    standalone: true,
    styleUrl:"./home.component.scss",
    templateUrl: "./home.component.html",
    imports: [BoxComponent, HeaderComponent, TaskListContainerComponent, TaskChartComponent]
})
export class HomePageComponent implements OnInit, OnDestroy{

    @Input() title = "teste home";

    tasks = [
      { title: 'Task 1', completed: true },
      { title: 'Task 2', completed: false },
      { title: 'Task 3', completed: true }
    ];
  
    get completedTasksCount() {
      return this.tasks.filter(task => task.completed).length;
    }
  
    get notCompletedTasksCount() {
      return this.tasks.filter(task => !task.completed).length;
    }

    constructor(private dailog: MatDialog){}

    onOpenModal(){
      this.dailog.open(BoxComponent, {
        data: {
          title: 'Box Modal',
          description: 'This is a description for the Box modal',
          imageUrl: 'https://example.com/.jpg',
          errorMessage: 'An error has occurred',
          showError: 'oi'
        },
        width: '1500px'
      })
    }

    ngOnDestroy(): void {
        
        //throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        /*console.log('Ok');
        this.apiService.post<any, any>("/auth/login", {
          email: "testehash@gmail.com",
          password: "67890000"
        })
        .pipe(
          tap(data => console.log('Response:', data))
        )
        .subscribe({
          next: (data) => console.log('Success:', data),
          error: (err) => console.error('Error:', err),
          complete: () => console.log('Request complete.')
        });
        this.authService.loginUser({email: "testehash@gmail.com", password: "67890000"})
        .pipe(
            tap(data => console.log('Response:', data))
          )
          .subscribe({
            next: (data) => console.log('Success:', data),
            error: (err) => console.error('Error:', err),
            complete: () => console.log('Request complete.')
          });*/
        ///throw new Error("Method not implemented.");
    }
}