
import { inject, Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { BehaviorSubject, map, Observable } from "rxjs";
import { SuccessResponse } from "../models/successResponse";
import { AuthResponse, LoginUserData } from "../models/auth.model";
import { PaginatedResponse } from "../shared/components/interfaces/paginatedResponse";
import { TaskModel } from "../models/task.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TaskStatistics } from "../models/task-statistics.model";
import { Department } from "../models/department.model";


@Injectable({providedIn: 'root'})
export class DepartmentService {

    private readonly apiService = inject(ApiService);

    
    loadDepartmentDetail(deptId: string): Observable<SuccessResponse<Department>> {
        return this.apiService.get<SuccessResponse<Department>>(`/department/${deptId}`, {} as any)
    }

    
    
      
}