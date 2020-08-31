import { AuthEnum, GraphlqlStateProps } from "./type";

export const GraphqlReducer = (state: GraphlqlStateProps, action: any) => {
  switch (action.type) {
    case AuthEnum.registerUser:
    case AuthEnum.loginUser:
      return {
        ...state,
        userId: action.payload.userId,
        token: action.payload.token
      };

    default:
      return state;
  }
};
