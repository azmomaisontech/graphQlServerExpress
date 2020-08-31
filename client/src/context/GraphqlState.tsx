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
  let requestBody: object;

  // For both Login and Registering users
  const authUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      const resData = await res.json();

      if (resData.data.login) {
        dispatch({
          type: AuthEnum.loginUser,
          payload: resData.data.login
        });
      } else {
        dispatch({
          type: AuthEnum.registerUser
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  //Register new user
  const registerUser = async ({ email, password }: FormData) => {
    requestBody = {
      query: `
                  mutation{
                      createUser(userInput: {email: "${email}" , password: "${password}"}) {
                          _id
                          email
                      }
                  }`
    };
    authUser();
  };

  //Login  user
  const loginUser = async ({ email, password }: FormData) => {
    requestBody = {
      query: `
              mutation{
                  login(loginInput: {email: "${email}" , password: "${password}"}) {
                      userId
                      token
                  }
              }`
    };
    authUser();
  };

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