import { inject, Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { BehaviorSubject, interval, Observable, switchMap, tap } from "rxjs";
import { SuccessResponse } from "../models/successResponse";
import { AuthResponse, CreateUserData, LoggedUser, LoggedUserInfo, LoginUserData } from "../models/auth.model";
import { error } from "console";
import { TokenService } from "./tokenService";

@Injectable({providedIn: 'root'})
export class AuthService {

    private readonly apiService = inject(ApiService);
    
    private userSubject = new BehaviorSubject<LoggedUserInfo | null>(null);
    user$ = this.userSubject.asObservable();

    constructor(private tokenService: TokenService){
        
    }

    initialize(): void {
        this.loadUserInfo();

        interval(10 * 60 * 1000)
        .pipe(switchMap(() => this.getUserInfo()))
        .subscribe(
            (response: SuccessResponse<LoggedUserInfo>) => {
                if(response.status === '200' && response.data) {
                    this.userSubject.next(response.data)
                }
            },
            error => {
                console.error("Error refreshing user info: ", error)
            }
        )
    }

    loginUser(data: LoginUserData): Observable<SuccessResponse<AuthResponse>>{
        return this.apiService.post<SuccessResponse<AuthResponse>, LoginUserData>("/auth/login", data)
        
        
    }   

    signupUser(data: CreateUserData): Observable<SuccessResponse<any>>{
        return this.apiService.post<SuccessResponse<any>, CreateUserData>("/auth/signUp", data)
        
    }   

    getUserInfo(): Observable<SuccessResponse<LoggedUserInfo>> {
        return this.apiService.get<SuccessResponse<LoggedUserInfo>>("/auth/me", {} as any)
    }

    loadUserInfo(): void {
        this.getUserInfo().subscribe(
            (response: SuccessResponse<LoggedUserInfo>) => {
                if(response.status === '200' && response.data){
                    this.userSubject.next(response.data);
                }
            },
            error => console.error('Error fetching user info: ', error)
        )
    }

}