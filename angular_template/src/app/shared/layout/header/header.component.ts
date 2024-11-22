import { Component } from "@angular/core";
import { CustomButtonComponent } from "../../components/custom-button/custom-button.component";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";


@Component({
    selector: 'app-header-component',
    standalone: true,
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
    imports: [CustomButtonComponent, CommonModule]
})
export class HeaderComponent{
    isMobileMenuOpen = false;

    constructor(private router: Router) {}

    toggleMobileMenu(): void {
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
    }

    redirectTo(route: string): void {
        this.router.navigate([route]);
    }
}