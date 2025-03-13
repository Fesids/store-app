import { Injectable, Inject } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
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

          //console.log('Updated history:', this.history);
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
    if (isPlatformBrowser(this.platformId)) {
      const lastUrl = this.getLastUrl();
      if (lastUrl) {
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
    } else {
      console.warn('Cannot navigate back on the server side.');
    }
  }
}
