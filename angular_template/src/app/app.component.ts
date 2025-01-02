import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationService } from './shared/utils/navigationService';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'template';

  constructor(private navigationService: NavigationService) {
  
  }
}
