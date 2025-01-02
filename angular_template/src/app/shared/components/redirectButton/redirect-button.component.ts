import { Component, Input } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { CustomButtonComponent } from "../custom-button/custom-button.component";


@Component({
    standalone: true,
    selector: 'app-redirect-button',
    templateUrl: './redirect-button.component.html',
    styleUrls: ['./redirect-button.component.scss'],
    imports: [CustomButtonComponent]

})
export class RedirectButton {

    @Input() redirectFunction: (() => void) | null = null;

    arrowSvg: SafeHtml;

   
  
    constructor(private sanitizer: DomSanitizer) {
      this.arrowSvg = this.sanitizeSvg(`
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left w-5 h-5">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      `);
    }

    onRedirect(){
      
        if (this.redirectFunction) {
            try {
              this.redirectFunction(); // Ensure this calls the function as passed
            } catch (error) {
              console.error('Error executing redirectFunction:', error);
            }
          } else {
            console.error('redirectFunction is not provided or is null.');
          }
          
          
    }

      private sanitizeSvg(svg: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
      }
}