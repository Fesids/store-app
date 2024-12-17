export interface SuccessResponse<D> {
    status: string,
    message: string,
    data?: D
}

export interface SuccessResponseTeste {
    status: string,
    message: string
}