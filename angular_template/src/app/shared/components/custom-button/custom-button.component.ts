import { CommonModule } from "@angular/common";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";

@Component({
    standalone: true,
    selector: 'app-custom-button',
    templateUrl: './custom-button.component.html',
    styleUrls: ['./custom-button.component.scss'],
    imports: [CommonModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class CustomButtonComponent {
    @Input() label: string = ''; 
    @Input() iconSvg?: SafeHtml; 
    @Input() iconImg?: string;  
    @Input() bgColor: string = 'bg-indigo-600'; 
    @Input() hoverBgColor: string = 'hover:bg-indigo-500'; 
    @Input() textColor: string = 'text-white'; 
    @Input() hoverTextColor: string = 'hover:text-white'; 
    @Input() additionalClasses: string = ''; 
    @Input() link?: string;
    @Input() onClick?: (() => void) | null = null 


    handleClick(): void {
        if (this.onClick) {
          this.onClick();  // Call the provided function
        } else {
          console.error('onClick is not provided or is null.');
        }
      }
}