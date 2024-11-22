import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { TaskListContainerComponent } from '../../shared/components/task/list-container/task-list-container.component';
import { TaskChartComponent } from '../../shared/charts/task-chart/task-chart.component';
import { BoxComponent } from '../../shared/components/boxComponent/box.component';
import { PaginatedResponse } from '../../shared/components/interfaces/paginatedResponse';
import { TaskModel } from '../../store/models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { SuccessResponse } from '../../store/models/successResponse';

@Component({
  standalone: true,
  styleUrls: ["./home.component.scss"],
  templateUrl: "./home.component.html",
  imports: [BoxComponent, HeaderComponent, TaskListContainerComponent, TaskChartComponent, CommonModule],
})
export class HomePageComponent implements OnInit, OnDestroy {
  @Input() title = "Home";

  tasks$: Observable<SuccessResponse<TaskModel[]>>;
  tasksArray$: Observable<TaskModel[]>;
  completedTasksCount$: Observable<number>;
  notCompletedTasksCount$: Observable<number>;

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
    const defaultEmployeeId = "86db2f60-bbd8-4ad8-b80d-4ea84e37865f";
    this.taskService.loadTasksById(defaultEmployeeId);
  }

  onPageChange(newPage: number): void {
    const defaultEmployeeId = "86db2f60-bbd8-4ad8-b80d-4ea84e37865f";
    this.taskService.loadPaginatedTasks({}, newPage, 5, defaultEmployeeId);
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
