export enum EventEnum {
  registerUser = "REGISTER_USER",
  createEvent = "CREATE_EVENT",
  loginUser = "LOGIN_USER",
  fetchEvents = "FETCH_EVENTS",
  eventSelected = "EVENT_SELECTED",
  clearSelectedEvent = "CLEAR_SELECTED_EVENT",
  bookEvent = "BOOK_EVENT",
  logoutUser = "LOGOUT_USER",
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
  bookings: any;
  loading: boolean;
  event: null | Event;
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
  eventSelected: (event: Event) => void;
  clearSelectedEvent: () => void;
  bookEvent: () => void;
}

export interface Props {
  children: JSX.Element[] | JSX.Element;
}
