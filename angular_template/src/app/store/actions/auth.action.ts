import {Action, createAction, props} from "@ngrx/store"
import { SuccessResponse, SuccessResponseTeste } from "../../models/successResponse";
import { AuthResponse, CreateUserData, LoggedUser, LoginUserData } from "../../models/auth.model";
import { error } from "console";

export const loginRequested = createAction(
    '[Auth] Login Requested',
    props<{ credentials: LoginUserData }>()
  );
  
  export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ response: AuthResponse }>()
  );
  
  export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: string }>()
  );
  
  // **Signup Actions**
  export const signupRequested = createAction(
    '[Auth] Signup Requested',
    props<{ userData: CreateUserData }>()
  );
  
  export const signupSuccess = createAction(
    '[Auth] Signup Success',
    props<{ response: AuthResponse }>()
  );
  
  export const signupFailure = createAction(
    '[Auth] Signup Failure',
    props<{ error: string }>()
  );
