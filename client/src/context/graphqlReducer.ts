import { AuthEnum, GraphlqlStateProps } from "./type";

export const GraphqlReducer = (state: GraphlqlStateProps, action: any) => {
  switch (action.type) {
    case AuthEnum.loginUser:
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token,
        isAuthenticated: true
      };
    case AuthEnum.registerUser:
      return {
        ...state,
        success: true
      };
    case AuthEnum.clearSuccess:
      return {
        ...state,
        success: false
      };
    default:
      return state;
  }
};
