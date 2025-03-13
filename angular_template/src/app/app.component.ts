import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from './shared/utils/navigationService';
import { Store } from '@ngrx/store';
import { initAuth } from './store/effects/auth.effect';
import { loadUser } from './store/actions/auth.action';
import { selectAuthError, selectAuthLoading, selectUser } from './store/selectors/auth.selector';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'template';
  
  private store = inject(Store)

  constructor(private navigationService: NavigationService) {
  
  }

  user$ = this.store.select(selectUser)
  loading$ = this.store.select(selectAuthLoading)
  error$ = this.store.select(selectAuthError)


  ngOnInit() {
    this.store.dispatch(loadUser());
   
  }

}
