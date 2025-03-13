export interface CreateMembership{
    userId: string,
    companyId: string,
    departmentId: Array<string>,
    memberRole: string,
   
}


export interface UpdateMembership{
    userId: string,
    companyId: string,
    departmentId: Array<string>,
    memberRole: string,
    createdAt: Date,
    updatedAt: Date,
   
}