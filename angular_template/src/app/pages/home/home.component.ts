import { Component, inject, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../../http/api.service";
import { catchError, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";


@Component({
    styleUrl:"./home.component.scss",
    templateUrl: "./home.component.html"
})
export class HomePageComponent implements OnInit, OnDestroy{

    @Input() title = "teste home";

    
   
    constructor(private readonly apiService: ApiService, private readonly authService: AuthService){

    }
    ngOnDestroy(): void {
        
        //throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        /*console.log('Ok');
        this.apiService.post<any, any>("/auth/login", {
          email: "testehash@gmail.com",
          password: "67890000"
        })
        .pipe(
          tap(data => console.log('Response:', data))
        )
        .subscribe({
          next: (data) => console.log('Success:', data),
          error: (err) => console.error('Error:', err),
          complete: () => console.log('Request complete.')
        });*/
        this.authService.loginUser({email: "testehash@gmail.com", password: "67890000"})
        .pipe(
            tap(data => console.log('Response:', data))
          )
          .subscribe({
            next: (data) => console.log('Success:', data),
            error: (err) => console.error('Error:', err),
            complete: () => console.log('Request complete.')
          });
        ///throw new Error("Method not implemented.");
    }
}