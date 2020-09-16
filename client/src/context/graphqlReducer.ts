import { EventEnum, GraphlqlStateProps } from "./type";

export const GraphqlReducer = (state: GraphlqlStateProps, action: any) => {
  switch (action.type) {
    case EventEnum.loginUser:
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case EventEnum.registerUser:
      return {
        ...state,
        success: true,
        loading: false
      };
    case EventEnum.clearSuccess:
      return {
        ...state,
        success: false
      };
    case EventEnum.logoutUser:
      return {
        ...state,
        userId: null,
        token: null,
        isAuthenticated: false
      };
    case EventEnum.createEvent:
      return {
        ...state,
        events: [...state.events, action.payload],
        loading: false
      };
    case EventEnum.fetchEvents:
      return {
        ...state,
        events: action.payload,
        loading: false
      };
    case EventEnum.setLoading:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
