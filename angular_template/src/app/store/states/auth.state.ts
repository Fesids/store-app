import { LoggedUser } from "../../models/auth.model";


export interface AuthState {
    user: LoggedUser | null,
    token: string | null,
    loading: boolean,
    error: string | null;
}

export const initialAuthState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
}