import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { SafeHtml } from "@angular/platform-browser";


@Component({
    standalone: true,
    selector: "app-card-component",
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [CommonModule]
})
export class CardComponent {

    @Input() title: string = "Title";
    @Input() value: number | string = 0;
    @Input() percentageChange: number = 0;
    @Input() description: string = "Description";
    @Input() color: string = "text-pink-500";
    @Input() bgColor: string = "bg-pink-100";
    @Input() icon?: SafeHtml; // Default icon class
    @Input() tooltip: string = "Since last month"

}