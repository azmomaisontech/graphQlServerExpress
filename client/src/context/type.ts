export enum EventEnum {
  registerUser = "REGISTER_USER",
  createEvent = "CREATE_EVENT",
  loginUser = "LOGIN_USER",
  fetchEvents = "FETCH_EVENTS",
  userLoaded = "USER_LOADED",
  updateUser = "UPDATE_USER",
  logoutUser = "LOGOUT_USER",
  updatePassword = "UPDATE_PASSWORD",
  setLoading = "SET_LOADING",
  authError = "AUTH_ERROR",
  clearError = "CLEAR_ERROR",
  clearSuccess = "CLEAR_SUCCESS"
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  creator: object;
}

export type GraphlqlStateProps = {
  token: null | string;
  userId: null | string;
  isAuthenticated: boolean;
  success: boolean;
  events: any;
  loading: boolean;
};

export interface FormData {
  email: string;
  password: string;
}

export interface CreateEvent {
  title: string;
  price: number;
  description: string;
}

export interface ContextProps extends GraphlqlStateProps {
  registerUser: (dataform: FormData) => void;
  loginUser: (dataform: FormData) => void;
  logoutUser: () => void;
  createEvent: (dataform: CreateEvent) => void;
  fetchEvents: () => void;
}

export interface Props {
  children: JSX.Element[] | JSX.Element;
}
