import { inject, Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { Observable } from "rxjs";
import { SuccessResponse } from "../store/models/successResponse";
import { AuthResponse, LoginUserData } from "../store/models/auth.model";
import { PaginatedResponse } from "../shared/components/interfaces/paginatedResponse";
import { TaskModel } from "../store/models/task.model";


@Injectable({providedIn: 'root'})
export class TaskService {

    private readonly apiService = inject(ApiService);


    retrievePaginatedTasks(criteria: any, page: number, pageSize: number): Observable<PaginatedResponse<TaskModel>>{
        return this.apiService.get<PaginatedResponse<TaskModel>>(`/tasks?employees=86db2f60-bbd8-4ad8-b80d-4ea84e37865f&page=${page}&pageSize=${pageSize}`)
        //return this.apiService.post<any, any>("/auth/login", data)
        /*.pipe(
            tap(data => console.log(JSON.stringify(data)))
            
        )*/
    }   
}