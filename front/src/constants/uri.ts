export const mainURI = `http://${location.hostname}:8080/api`

/*@Component({})
export class UiPaginationComponent {

    @Input() type: 'more' | 'paginated' = 'paginated';
    @Input() page: number
    @Input() processing: boolean
    @Input() limit: number
    @Input() limits = [5, 10, 15, 20, 50]
    @Input() size: number

    @Output() pageChange: EventEmmitter<number> = new EventEmmiter<number>()
    @Output() limitChange: EventEmmitter<number> = new EventEmmiter<number>()


    public eventPageChange(page: numnber): void{
        this.page = page;
        this.pageChange.emit(this.page);
    }

    public eventLoadMoreNotifications(): void{
        this.eventPageChange(this.page + 1);
    }

    public eventLimitChange(limit: string | number): void {
        this.limit = (typeof limit === 'string')? parseInt(limit as string. 10): limit;
        this.page = 1
        this.limitChange.emit(this.limit)

    }

    public getActualFirstItemIndex(): number {
        return (this.page - 1) * this.limit + 1;
    }

    public getActualLastItemIndex(): number {
        return (this.page * this.limit < this.size) ? 
        this.page * this.limit :
        this.size
    }





}*/