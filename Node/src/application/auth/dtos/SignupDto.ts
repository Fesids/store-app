
export interface SignUpDto {
    email: string,
    firstName: string,
    lastName: string,
    password: string
    rePassword: string,
    roles: Array<string>
}