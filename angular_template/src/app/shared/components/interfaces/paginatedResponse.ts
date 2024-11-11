
export interface PaginatedResponse<T> {
    data: Array<T>,
    total: number,
    page: number,
    pageSize: number
}