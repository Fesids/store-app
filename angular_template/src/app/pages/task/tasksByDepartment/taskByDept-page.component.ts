import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { TaskService } from '../../../services/task.service';
import { selectUser } from '../../../store/selectors/auth.selector';
import { LoggedUserInfo } from '../../../models/auth.model';
import { isUserWithGuid } from '../../../shared/utils/userValidation';
import { PaginatedResponse } from '../../../shared/components/interfaces/paginatedResponse';
import { TaskModel } from '../../../models/task.model';
import { forkJoin, Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginatedListComponent } from '../../../shared/components/paginated/list/paginated-list.component';
import { DepartmentService } from '../../../services/departmentService';

@Component({
  selector: 'app-task-list',
  templateUrl: './taskByDept-page.component.html',
  imports: [CommonModule, PaginatedListComponent]
})
/*export class TasksByDeptComponent implements OnInit {
  private readonly store = inject(Store);

  constructor(private taskService: TaskService, private router: Router) {}

  // Seleciona o usuário do store
  user$ = this.store.select(selectUser);

  // Getter para acessar o observable tasks$ do taskService somente quando necessário
  get tasks$(): Observable<PaginatedResponse<TaskModel>> {
    return this.taskService.tasks$;
  }

  ngOnInit(): void {
    this.user$.pipe(
      filter(isUserWithGuid),
      take(1)
    ).subscribe((user: LoggedUserInfo) => {
      console.log('User: ', user);
      // Chama o método do TaskService passando os departamentos do usuário
      this.taskService.loadPaginatedTasks({}, 1, 5, user.departmentId);
    });
  }

  goToTask(taskId: string): void {
    this.router.navigate([`/tarefa/${taskId}`]);
  }
}*/

export class TasksByDeptComponent implements OnInit {
    private readonly store = inject(Store);
    

    user$ = this.store.select(selectUser);
    
    
    page: number = 1;
    pageSize: number = 5;
    total: number = 0;
    totalPages: number = 0;
    
    
    user: LoggedUserInfo | null = null;
    
    
    get tasks$(): Observable<PaginatedResponse<TaskModel>> {
      return this.taskService.tasks$;
    }
    
    private tasksSubscription?: Subscription;
  
    constructor(private taskService: TaskService, private router: Router,  private departmentService: DepartmentService) {}
  
    tasksWithDept$!: Observable<PaginatedResponse<TaskModel>>;

    
  
   
  
    ngOnInit(): void {
      this.user$
        .pipe(
          filter(isUserWithGuid),
          take(1)
        )
        .subscribe((user: LoggedUserInfo) => {
          console.log('User:', user);
          this.user = user;
          this.loadTasks(this.page);
        });
  
      
      this.tasksWithDept$ = this.taskService.tasks$.pipe(
        switchMap(response => {
          
          if (!response.data || !response.data.data || response.data.data.length === 0) {
            return of(response);
          }
          const tasks: TaskModel[] = response.data.data;
  
         
          const uniqueDeptIds = Array.from(new Set(tasks.flatMap(task => task.departments)));
  
         
          const deptObservables = uniqueDeptIds.map(id =>
            this.departmentService.loadDepartmentDetail(id).pipe(
              map(res => ({ id, name: res?.data?.name })), 
             
              catchError(() => of({ id, name: id }))
            )
          );
  
        
          return forkJoin(deptObservables).pipe(
            map(deptResults => {
             
              const deptMap = new Map<string, string>(
                deptResults.map(d => [d.id, d.name ?? d.id] as [string, string])
              );
              
              
              tasks.forEach(task => {
                task.departmentNames = task.departments.map((deptId: string) => deptMap.get(deptId) || deptId);
              });
             
              return { ...response, data: { ...response.data, data: tasks } };
            })
          );
        })
      );
    }
  
    ngOnDestroy(): void {
      this.tasksSubscription?.unsubscribe();
    }
  
    loadTasks(page: number): void {
      if (this.user) {
        this.taskService.loadPaginatedTasks({}, page, this.pageSize, this.user.departmentId);
        this.tasks$.subscribe(response => {
            this.total = response.data.total;
            this.totalPages = Math.ceil(this.total / this.pageSize);
            this.page = page; 
          });
        }
      
    }
  
    changePage(newPage: number): void {
        console.log("pagina: ", newPage)
      if (newPage >= 1 && newPage <= this.totalPages) {
      
        this.loadTasks(newPage);
      }
    }
  
    goToTask(taskId: string): void {
      this.router.navigate([`/tarefa/${taskId}`]);
    }
  
  }
