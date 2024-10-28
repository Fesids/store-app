import { Component, Input } from "@angular/core";


@Component({
    standalone: true,
    selector: "app-title-component",
    templateUrl: "./page-title.component.html",
    styleUrls: ["./page-title.component.scss"]
})
export class PageTitleComponent {
    @Input() title: string = "";



}