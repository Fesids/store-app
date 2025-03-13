export interface CreateDepartmentDto {
    name: string,
    companyId: string,
    description: string,
    supervisors: Array<string>,
    gestor: string,
}