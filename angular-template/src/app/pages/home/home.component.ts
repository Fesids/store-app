import { Component, inject, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../../http/api.service";
import { tap } from "rxjs";


@Component({
    styleUrl:"./home.component.scss",
    templateUrl: "./home.component.html"
})
export class HomePageComponent implements OnInit, OnDestroy{

    @Input() title = "teste home";

    private readonly apiService = inject(ApiService)
   
    constructor(){

    }
    ngOnDestroy(): void {
        
        //throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        this.apiService.post("/auth/login", {
            email: "testehash@gmail.com",
            password: "67890000"
        }).pipe(
            tap(data => console.log(data))
        )
        ///throw new Error("Method not implemented.");
    }
}