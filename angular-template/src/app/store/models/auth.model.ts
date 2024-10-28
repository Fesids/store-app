export interface LoggedUser {
    guid: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string
}


export interface AuthResponse {
    status: string;
    message: string;
    data: {
        loggedUser: LoggedUser;
        token: string;
    }
}

export interface LoginUserData{
    email: string,
    password: string
}
export interface CreateUserData {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    rePassword: string
}

