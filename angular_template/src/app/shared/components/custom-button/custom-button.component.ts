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
    @Input() label: string = ''; // The text label inside the button
    @Input() iconSvg?: SafeHtml;  // SVG markup as a string
    @Input() iconImg?: string;  // URL for an image
    @Input() bgColor: string = 'bg-indigo-600'; // Default background color
    @Input() hoverBgColor: string = 'hover:bg-indigo-500'; // Hover background color
    @Input() textColor: string = 'text-white'; // Default text color
    @Input() hoverTextColor: string = 'hover:text-white'; // Hover text color
    @Input() additionalClasses: string = ''; // Custom classes for additional styling
    @Input() link: string = '#';
}