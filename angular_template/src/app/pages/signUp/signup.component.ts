import { Component, importProvidersFrom, OnInit } from "@angular/core";
import { FormField } from "../../shared/components/interfaces/formField";
import { GenericFormComponent } from "../../shared/components/generic-form/genericForm.component";
import { provideStore, Store } from "@ngrx/store";
import { AppState } from "../../store/states/app.state";
import { Router } from "@angular/router";
import { reducers, metaReducers } from "../../store/reducers";
import { AuthEffects } from "../../store/effects/auth.effect";
import { provideEffects } from "@ngrx/effects"
import { signupRequested } from "../../store/actions/auth.action";
import { AuthService } from "../../services/auth.service";
import { tap } from "rxjs";
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";

@Component({
    standalone: true,
    selector: "app-signup-component",
    styleUrls: ["./signup.component.scss"],
    templateUrl: "./signup.component.html",
    imports: [GenericFormComponent, PageTitleComponent],
   
})
export class SignupPageComponent implements OnInit{

    constructor( private router: Router, private store: Store, private authService: AuthService){}

    signupFields: FormField[] = [
        {name: 'firstName', label: 'First Name', placeholder: 'Enter your name', type: 'text', required: true },
        {name: 'lastName', label: 'Last Name', placeholder: 'Enter your last name', type: 'text'},
        {name: 'email', label: 'Email', placeholder: 'Enter your email', type: 'email' },
        {name: 'password', label: 'Password', placeholder: 'Enter your password', type: 'password' },
        {name: 'rePassword', label: 'Re-password', placeholder: 'Re enter your password', type: 'password'}
      ];
    

    ngOnInit(): void {
        ///throw new Error("Method not implemented.");
    }

    onSubmit(data:any): void{
        console.log("Ok signp ", data);
        this.authService.signupUser(data)
        .pipe(
            tap(data => console.log('Response:', data))
          )
          .subscribe({
            next: (data) => console.log('Success:', data),
            error: (err) => console.error('Error:', err),
            complete: () => console.log('Request complete.')
          });
        //this.store.dispatch(signupRequested(data))
    }
    
}