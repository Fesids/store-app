import { Pagination } from "./Pagination";

export const getPaginationOptions = (pagination?: Pagination) =>{
    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;
    const skip = (page - 1) * pageSize;
    return {skip, limit: pageSize}
}

export const getTotalPages = (total: number, pageSize: number) => {
    return Math.ceil(total / pageSize)

}