import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AppInitService {
  constructor(private authService: AuthService) {}

  init(): Promise<void> {
    return new Promise((resolve) => {
      this.authService.initialize();
      resolve();
    });
  }
}