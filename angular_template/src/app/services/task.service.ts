import { inject, Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { SuccessResponse } from "../models/successResponse";
import { AuthResponse, LoginUserData } from "../models/auth.model";
import { PaginatedResponse } from "../shared/components/interfaces/paginatedResponse";
import { TaskModel } from "../models/task.model";
import { HttpClient, HttpParams } from "@angular/common/http";
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
    
    

          loadPaginatedTasks(
            criteria: any = {},
            page = 1,
            pageSize = 5,
            departments?: string[],
            employees?: string,
           
          ): void {
            // Cria um objeto com os parâmetros básicos, mantendo também a propriedade "employees"
            let paramsObj: any = {
              ...criteria,
              page,
              pageSize,
              ...(employees ? { employees } : {})
            };
          
            // Se houver departments, converte o array em uma string separada por vírgulas
            if (departments && departments.length > 0) {
              paramsObj.departments = departments.join(',');
            }
          
            const params = new HttpParams({ fromObject: paramsObj });
          
            this.apiService.get<PaginatedResponse<TaskModel>>('/tasks', params).subscribe({
              next: (response) => this.tasksSubject.next(response),
              error: (err) => console.error('Error loading tasks', err),
            });
          }
          
      
    
    
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
    
      
}