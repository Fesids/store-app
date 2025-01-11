import { Component, OnInit } from "@angular/core";
import { GenericFormComponent } from "../../shared/components/generic-form/genericForm.component";
import { FormField } from "../../shared/components/interfaces/formField";
import { AuthService } from "../../services/auth.service";
import { tap } from "rxjs";
import { setTokenCookie } from "../../shared/utils/setCookie";
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/states/app.state";


@Component({

    standalone: true,
    selector: "app-login-component",
    styleUrl: "./login.component.scss",
    templateUrl: "./login.component.html",
    imports: [GenericFormComponent, PageTitleComponent]
})
export class LoginPageComponent implements OnInit{

    constructor(private readonly authService: AuthService, private router: Router){}

    loginFields: FormField[] = [
        { name: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
        { name: 'password', label: 'Password', placeholder: 'Enter your password', type: 'password' },
      ];

      onRedirect(){
        this.router.navigate(['/signup'])
      }
    
      /*onSubmit(data: any) {
        console.log('Login data:', data);
        this.authService.loginUser(data)
      .pipe(
          tap(data => console.log('Response:', data.data))
         
        )
        .subscribe({
          next: (data) => setTokenCookie(data.data?.token || ""),
          error: (err) => console.error('Error:', err),
          complete: () => console.log('Request complete.')
        });
       
      }*/

        onSubmit(data: any) {
          console.log('Login data:', data);
          this.authService.loginUser(data)
            .pipe(
              tap(data => console.log('Response:', data.data))
            )
            .subscribe({
              next: (response) => {
                const token = response.data?.token || "";
                //Consertei o back setTokenCookie(token); 
                //console.log('Token saved:', token);
              },
              error: (err) => {
                console.error('Error:', err);
              },
              complete: () => {
                console.log('Login successful. Redirecting to home...');
                this.router.navigate(['']); 
              }
            });
        }
        
        

    ngOnInit(): void {
      
        //throw new Error("Method not implemented.");
    }
    
}