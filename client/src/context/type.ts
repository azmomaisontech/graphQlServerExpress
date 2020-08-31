import { string } from "prop-types";

export enum AuthEnum {
  registerUser = "REGISTER_USER",
  googleUserAuth = "GOOGLE_USER_AUTH",
  loginUser = "LOGIN_USER",
  userLoaded = "USER_LOADED",
  updateUser = "UPDATE_USER",
  logoutUser = "LOGOUT_USER",
  updatePassword = "UPDATE_PASSWORD",
  setLoading = "SET_LOADING",
  authError = "AUTH_ERROR",
  clearError = "CLEAR_ERROR",
  clearSuccess = "CLEAR_SUCCESS"
}

export type GraphlqlStateProps = {
  token: null | string;
  userId: null | string;
};

export interface FormData {
  email: string;
  password: string;
}

export interface UpdateName {
  name: string;
}

export interface UpdateEmail {
  email: string;
}

export interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export interface ContextProps extends GraphlqlStateProps {
  registerUser: (dataform: FormData) => void;
  loginUser: (dataform: FormData) => void;
}

export interface Props {
  children: JSX.Element[] | JSX.Element;
}
