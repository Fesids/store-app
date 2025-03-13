
export interface Department {
    guid: string,
    name: string;
    companyId: string;
    description: string;
    supervisors: Array<string>;
    gestor: string;
    createdAt: Date;
    updatedAt: Date;

}