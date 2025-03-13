import { LoggedUserInfo } from "../../models/auth.model";

export function isUserWithGuid(user: LoggedUserInfo | null): user is LoggedUserInfo {
  return !!user?.guid;
}