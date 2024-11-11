import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";


@Component({
    standalone: true,
    selector: 'app-paginated-list',
    templateUrl: './paginated-list.component.html',
    styleUrls: ['./paginated-list.component.scss'],
    imports: [CommonModule]
})
export class PaginatedListComponent {
    @Input() data: any[] = [];
    @Input() total: number = 0;
    @Input() pageSize: number = 10;
    @Input() page: number = 1;
    @Output() pageChange = new EventEmitter<number>();

    totalPages = 1;

    ngOnChanges() {
        this.totalPages = Math.ceil(this.total / this.pageSize);
    }

    changePage(newPage: number) {
        this.pageChange.emit(newPage);
    }


}