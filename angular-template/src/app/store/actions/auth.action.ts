import {Action, createAction, props} from "@ngrx/store"
import { SuccessResponse } from "../models/successResponse";
import { CreateUserData, LoggedUser, LoginUserData } from "../models/auth.model";
import { error } from "console";

export const signUpUser = createAction('[User] Sign in User', props<{createData: CreateUserData}>());
export const createUserSuccess = createAction('[User] Create user Success', props<{payload: SuccessResponse<any> }>())
export const createUserFailure = createAction('[User] Create User Failed', props<{error : any}>())

export const loginUser = createAction('[User] log in user', props<{loginData: LoginUserData}>());
export const fetchUserSuccess = createAction('[User] Fetch user Success', props<{payload: SuccessResponse<LoggedUser>}>())
export const fetchUserFailure = createAction('[User] Fetch User Failed', props<{error : any}>())



