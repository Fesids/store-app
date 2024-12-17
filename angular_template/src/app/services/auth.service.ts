import { inject, Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { Observable, tap } from "rxjs";
import { SuccessResponse } from "../models/successResponse";
import { AuthResponse, CreateUserData, LoggedUser, LoginUserData } from "../models/auth.model";

@Injectable({providedIn: 'root'})
export class AuthService {

    private readonly apiService = inject(ApiService);
    //constructor(private apiService: ApiService){}

    //login(): Observable<

    loginUser(data: LoginUserData): Observable<SuccessResponse<AuthResponse>>{
        return this.apiService.post<SuccessResponse<AuthResponse>, LoginUserData>("/auth/login", data)
        //return this.apiService.post<any, any>("/auth/login", data)
        /*.pipe(
            tap(data => console.log(JSON.stringify(data)))
            
        )*/
    }   

    signupUser(data: CreateUserData): Observable<SuccessResponse<any>>{
        return this.apiService.post<SuccessResponse<any>, CreateUserData>("/auth/signUp", data)
        //return this.apiService.post<any, any>("/auth/signUp", data)
        /*.pipe(
            tap(data => console.log(JSON.stringify(data)))
        )*/
    }   

}