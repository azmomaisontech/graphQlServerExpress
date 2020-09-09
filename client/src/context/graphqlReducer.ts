import { EventEnum, GraphlqlStateProps } from "./type";

export const GraphqlReducer = (state: GraphlqlStateProps, action: { type: string; payload: any }) => {
  switch (action.type) {
    case EventEnum.loginUser:
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        isAuthenticated: true
      };
    case EventEnum.registerUser:
      return {
        ...state,
        success: true
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
        events: state.events.push(action.payload)
      };
    default:
      return state;
  }
};
