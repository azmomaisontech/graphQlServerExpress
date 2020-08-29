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
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  success: false
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
  const loadUser = async () => {};

  //Register new user
  const registerUser = async (formData: FormData) => {
    const url = "api/v1/auth/register";
    const type = AuthEnum.registerUser;
    await authUser(formData, url, type);
  };

  //Login  user
  const loginUser = async (formData: FormData) => {
    const url = "api/v1/auth/login";
    const type = AuthEnum.loginUser;
    await authUser(formData, url, type);
  };

  //Update user name
  const updateUserName = async (formData: UpdateName) => {};

  //Update user email
  const updateUserEmail = async (formData: UpdateEmail) => {};

  //Update user password
  const updateUserPassword = async (formData: UpdatePassword) => {};

  const logoutUser = async () => {};

  //Clear Success field
  const clearSuccess = () => {
    setTimeout(() => {
      dispatch({
        type: AuthEnum.clearSuccess
      });
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{
        loading: state.loading,
        isAuthenticated: state.isAuthenticated,
        error: state.error,
        user: state.user,
        success: state.success,
        registerUser,
        loginUser,
        loadUser,
        updateUserName,
        updateUserEmail,
        updateUserPassword,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthState };
