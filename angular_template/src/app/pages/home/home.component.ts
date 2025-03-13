import { Component, Input, OnInit, OnDestroy, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, first, map, startWith, take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { TaskListContainerComponent } from '../../shared/components/task/list-container/task-list-container.component';
import { TaskChartComponent } from '../../shared/charts/task-chart/task-chart.component';
import { BoxComponent } from '../../shared/components/boxComponent/box.component';
import { PaginatedResponse } from '../../shared/components/interfaces/paginatedResponse';
import { TaskModel } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { SuccessResponse } from '../../models/successResponse';
import { CardContainerComponent } from '../../shared/components/cardComponent/cardsContainer/card-container.component';
import { AuthService } from '../../services/auth.service';
import { LoggedUserInfo } from '../../models/auth.model';
import { Store } from '@ngrx/store';
import { selectAuthError, selectAuthLoading, selectUser } from '../../store/selectors/auth.selector';
import { loadUser } from '../../store/actions/auth.action';
import { isUserWithGuid } from '../../shared/utils/userValidation';





@Component({
  standalone: true,
  styleUrls: ["./home.component.scss"],
  templateUrl: "./home.component.html",
  imports: [HeaderComponent, TaskListContainerComponent, TaskChartComponent, CommonModule, CardContainerComponent],
})
export class HomePageComponent implements OnInit, OnDestroy {
  @Input() title = "Home";

  tasks$: Observable<SuccessResponse<TaskModel[]>>;
  tasksArray$: Observable<TaskModel[]>;
  completedTasksCount$: Observable<number>;
  notCompletedTasksCount$: Observable<number>;

  private store = inject(Store)
  
   
  user$ = this.store.select(selectUser)
  loading$ = this.store.select(selectAuthLoading)
  error$ = this.store.select(selectAuthError)
  
  
    

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    this.tasks$ = this.taskService.allTasks$;

    this.tasksArray$ = this.tasks$.pipe(
      map(tasksResponse => tasksResponse?.data || []),
      startWith([])
    );

    this.completedTasksCount$ = this.tasksArray$.pipe(
      map(tasks => tasks.filter(task => task.completed).length)
    );
    this.notCompletedTasksCount$ = this.tasksArray$.pipe(
      map(tasks => tasks.filter(task => !task.completed).length)
    );
  }


    ngOnInit(): void {
      //this.store.dispatch(loadUser());
      
      this.user$.pipe(
        filter(isUserWithGuid), 
        take(1)
      ).subscribe(user => {
        //console.log("UserHome: ", user);
        this.taskService.loadTasksById(user.guid);
        this.taskService.loadPaginatedTasks({}, 1, 5, undefined, user.guid);
      });
    }
  
    onPageChange(newPage: number): void {
      this.user$.pipe(
        filter(isUserWithGuid),
        take(1)
      ).subscribe(user => {
        this.taskService.loadPaginatedTasks({}, newPage, 5, undefined, user.guid);
      });
    }


  onOpenModal(): void {
    this.dialog.open(BoxComponent, {
      data: {
        title: 'Box Modal',
        description: 'This is a description for the Box modal',
        imageUrl: 'https://example.com/image.jpg',
        errorMessage: 'An error has occurred',
        showError: 'Something went wrong!',
      },
      width: '1500px',
    });
  }

  ngOnDestroy(): void {
    
  }
}
