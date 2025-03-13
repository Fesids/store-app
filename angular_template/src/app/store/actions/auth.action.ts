import {Action, createAction, props} from "@ngrx/store"
import { SuccessResponse, SuccessResponseTeste } from "../../models/successResponse";
import { AuthResponse, CreateUserData, LoggedUser, LoggedUserInfo, LoginUserData } from "../../models/auth.model";
import { error } from "console";

export const loadUser = createAction('[Auth] Load User');

export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: LoggedUserInfo }>()
);

export const loadUserFailure = createAction(
  '[Auth] Load User Failure',
  props<{ error: any }>()
);