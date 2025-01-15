import { Injectable, OnInit } from "@angular/core";


import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService implements OnInit {
  private history: string[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
    
      const savedHistory = localStorage.getItem('navigationHistory');
      if (savedHistory) {
        this.history = JSON.parse(savedHistory);
      }

      
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const currentUrl = event.urlAfterRedirects;

          
          if (this.history.length === 0 || this.history[this.history.length - 1] !== currentUrl) {
            this.history.push(currentUrl);

           
            localStorage.setItem('navigationHistory', JSON.stringify(this.history));
          }

          console.log('Updated history:', this.history);
        }
      });
    } else {
      console.warn('localStorage is not available in this environment.');
    }
  }

  getLastUrl(): string | null {
    if (this.history.length > 1) {
      return this.history[this.history.length - 2];
    }
    console.warn('History does not have enough entries:', this.history);
    return null;
  }

  goBack(): void {
    const lastUrl = this.getLastUrl();
    if (lastUrl) {
      console.log('Navigating to:', lastUrl);
      this.router.navigateByUrl(lastUrl).then(success => {
        if (!success) {
          console.warn('Navigation failed:', lastUrl);
        } else {
          this.history.pop();
          localStorage.setItem('navigationHistory', JSON.stringify(this.history));
        }
      });
    } else {
      console.warn('No last URL found to navigate to!');
    }
  }
}
