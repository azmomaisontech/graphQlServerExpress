import React, { useReducer, createContext } from "react";
import { GraphqlReducer } from "./graphqlReducer";
import {
  ContextProps,
  Props,
  FormData,
  UpdateName,
  UpdateEmail,
  UpdatePassword,
  AuthEnum,
  GraphlqlStateProps
} from "./type";

const initialState: GraphlqlStateProps = {
  userId: null,
  token: null
};

const AuthContext = createContext<Partial<ContextProps>>({});

const AuthState: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(GraphqlReducer, initialState);

  //Methods
  //Sets Loading to true
  const setLoading = () => {
    dispatch({
      type: AuthEnum.setLoading
    });
  };

  // For both Login and Registering users
  const authUser = async (formData: FormData, url: string, type: string) => {};

  //Load user after registering or login
  const loadUser = async (formData: FormData) => {};

  //Register new user
  const registerUser = async (formData: FormData) => {};

  //Login  user
  const loginUser = async (formData: FormData) => {};

  const logoutUser = async () => {};

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        token: state.userId,
        registerUser,
        loginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthState };
