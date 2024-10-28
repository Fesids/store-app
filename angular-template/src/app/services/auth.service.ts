import { inject, Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { Observable, tap } from "rxjs";
import { SuccessResponse } from "../store/models/successResponse";
import { CreateUserData, LoggedUser, LoginUserData } from "../store/models/auth.model";

@Injectable({providedIn: 'root'})
export class AuthService {

    private readonly apiService = inject(ApiService);

    //login(): Observable<

    loginUser(data: LoginUserData): Observable<SuccessResponse<LoggedUser>>{
        return this.apiService.post<SuccessResponse<LoggedUser>, LoginUserData>("/auth/login", data)
        .pipe(
            tap(data => console.log(JSON.stringify(data)))
            
        )
    }   

    signupUser(data: CreateUserData): Observable<SuccessResponse<any>>{
        return this.apiService.post<SuccessResponse<any>, CreateUserData>("/auth/signUp", data)
        .pipe(
            tap(data => console.log(JSON.stringify(data)))
        )
    }   

}