import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './http/api.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'angular-template';

  private readonly apiService = inject(ApiService)
   
    constructor(){

    }
    ngOnDestroy(): void {
        
        //throw new Error("Method not implemented.");
    }
    ngOnInit(): void {
        /*this.apiService.post("/auth/login", {
            email: "testehash@gmail.com",
            password: "67890000"
        }).pipe(
            tap(data => console.log(data)))
            .subscribe({
              next: (data) => console.log('Login resp', data)
            })*/
        ///throw new Error("Method not implemented.");
    }
}
