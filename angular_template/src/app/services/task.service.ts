import { inject, Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { SuccessResponse } from "../models/successResponse";
import { AuthResponse, LoginUserData } from "../models/auth.model";
import { PaginatedResponse } from "../shared/components/interfaces/paginatedResponse";
import { TaskModel } from "../models/task.model";
import { HttpClient } from "@angular/common/http";
import { TaskStatistics } from "../models/task-statistics.model";


@Injectable({providedIn: 'root'})
export class TaskService {

    private readonly apiService = inject(ApiService);

    private tasksSubject = new BehaviorSubject<PaginatedResponse<TaskModel>>({
        data: { data: [], total: 0, page: 1, pageSize: 5, totalPages: 0 },
        status: " ",
        message: ""
    });

    private allTasksSubject = new BehaviorSubject<SuccessResponse<TaskModel[]>>({} as any)
    
    private taskEmployeeStatisticsSubject = new BehaviorSubject<SuccessResponse<TaskStatistics>>({} as any)
    
    tasks$ = this.tasksSubject.asObservable();
    allTasks$ = this.allTasksSubject.asObservable();
    taskEmployeeStatistics = this.taskEmployeeStatisticsSubject.asObservable();

    loadTaskById(taskId: string): Observable<SuccessResponse<TaskModel>> {
      return this.apiService.get<SuccessResponse<TaskModel>>(`/tasks/${taskId}`, {} as any)
    }

    loadTaskEmployeeStatistics(employeeId: string): void {
      this.apiService.get<SuccessResponse<TaskStatistics>>(`/tasks/statistic/employee/${employeeId}`, {} as any)
      .subscribe({
        next: (response) => this.taskEmployeeStatisticsSubject.next(response),
        error: (err) => console.error('Error loading tasks employee statistcs', err),
      })
    }
    
    loadTasksById(id: string): void {
            
        this.apiService.get<SuccessResponse<TaskModel[]>>(`/tasks/all/${id}`, {} as any).subscribe({
            next: (response) => this.allTasksSubject.next(response),
            error: (err) => console.error('Error loading tasks', err),
          });
        }
    
      loadPaginatedTasks(criteria: any = {}, page = 1, pageSize = 5, employees?: string): void {
        //const params = { ...criteria, page, pageSize, employees };
        /*this.http.get<PaginatedResponse<TaskModel>>(`http://localhost:3000/api/v1/tasks`, { params }).subscribe({
          next: (response) => this.tasksSubject.next(response),
          error: (err) => console.error('Error loading tasks', err),
        });*/

        const params = {
            ...criteria,
            page,
            pageSize,
            ...(employees ? { employees } : {}) 
        };

        console.log(params)
    

        this.apiService.get<PaginatedResponse<TaskModel>>("/tasks", params).subscribe({
            next: (response) => this.tasksSubject.next(response),
            error: (err) => console.error('Error loading tasks', err),
          });
      }
      
    
      /*get tasks$(): Observable<PaginatedResponse<TaskModel>> {
        return this.tasksSubject.asObservable();
      }*/
    
      get completedTasksCount$(): Observable<number> {
        return this.tasks$.pipe(
          map((tasks) => tasks.data.data.filter((task) => task.completed).length)
        );
      }
    
      get notCompletedTasksCount$(): Observable<number> {
        return this.tasks$.pipe(
          map((tasks) => tasks.data.data.filter((task) => !task.completed).length)
        );
      }
    
      /*loadTasks(criteria: any = {}, page: number = 1, pageSize: number = 5): void {
        this.apiService.get<PaginatedResponse<TaskModel>>(`/tasks?employees=86db2f60-bbd8-4ad8-b80d-4ea84e37865f&page=${page}&pageSize=${pageSize}`)
          .subscribe((response) => this.tasksSubject.next(response));
      }*/

          /*loadTasks(criteria: any = {}, page: number = 1, pageSize: number = 5): void {
            this.apiService
              .get<PaginatedResponse<TaskModel>>(`/tasks?employees=86db2f60-bbd8-4ad8-b80d-4ea84e37865f&page=${page}&pageSize=${pageSize}`)
              .pipe(
                map(response => ({
                  ...response,
                  data: Array.isArray(response.data) ? response.data : [] 
                }))
              )
              .subscribe({
                next: response => this.tasksSubject.next(response),
                error: err => console.error('Error loading tasks', err)
              });
          }*/
          


    /*retrievePaginatedTasks(criteria: any, page: number, pageSize: number): Observable<PaginatedResponse<TaskModel>>{
        return this.apiService.get<PaginatedResponse<TaskModel>>(`/tasks?employees=86db2f60-bbd8-4ad8-b80d-4ea84e37865f&page=${page}&pageSize=${pageSize}`)
        //return this.apiService.post<any, any>("/auth/login", data)
        /*.pipe(
            tap(data => console.log(JSON.stringify(data)))
            
        )
    }   */
}