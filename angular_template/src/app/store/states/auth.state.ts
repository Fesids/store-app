import { LoggedUser, LoggedUserInfo } from "../../models/auth.model";


export interface AuthState {
    user: LoggedUserInfo | null;
    loading: boolean;
    error: any;
  }
  
  export const initialAuthState: AuthState = {
    user: null,
    loading: false,
    error: null,
  };