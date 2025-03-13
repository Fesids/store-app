import { Component, OnInit } from "@angular/core";
import { GenericFormComponent } from "../../shared/components/generic-form/genericForm.component";
import { FormField } from "../../shared/components/interfaces/formField";
import { AuthService } from "../../services/auth.service";
import { catchError, filter, first, of, tap, timeout } from "rxjs";
import { setTokenCookie } from "../../shared/utils/setCookie";
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../../store/states/app.state";
import { selectUser } from "../../store/selectors/auth.selector";
import { TokenService } from "../../services/tokenService";
import { loadUser } from "../../store/actions/auth.action";


@Component({

    standalone: true,
    selector: "app-login-component",
    styleUrl: "./login.component.scss",
    templateUrl: "./login.component.html",
    imports: [GenericFormComponent, PageTitleComponent]
})
export class LoginPageComponent implements OnInit{

    constructor(private readonly authService: AuthService, private router: Router, private store: Store, private tokenService: TokenService){}

    loginFields: FormField[] = [
        { name: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
        { name: 'password', label: 'Password', placeholder: 'Enter your password', type: 'password' },
      ];

      onRedirect(){
        this.router.navigate(['/signup'])
      }
    
      // login.component.ts
// login.component.ts


        onSubmit(data: any) {
          //console.log('Login data:', data);
          this.authService.loginUser(data)
            .pipe(
              tap(data => {
                //console.log('Response:', data.data)
              
                //this.authService.loadUserInfo()
                this.store.dispatch(loadUser());
              }
            
            )
            )
            .subscribe({
              next: (response) => {
                const token = response.data?.token || "";
               
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