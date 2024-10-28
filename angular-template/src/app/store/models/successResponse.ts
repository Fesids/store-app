export interface SuccessResponse<D> {
    status: string,
    message: string,
    data?: D
}