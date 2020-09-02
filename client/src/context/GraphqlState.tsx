import React, { useReducer, createContext } from "react";
import { GraphqlReducer } from "./graphqlReducer";
import { ContextProps, Props, FormData, AuthEnum, GraphlqlStateProps } from "./type";

const initialState: GraphlqlStateProps = {
  userId: null,
  token: null,
  isAuthenticated: false,
  success: false
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
    setTimeout(() => {
      dispatch({
        type: AuthEnum.clearSuccess
      });
    }, 1000);
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

  //Logout user
  const logoutUser = () => {
    dispatch({
      type: AuthEnum.logoutUser
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        token: state.userId,
        isAuthenticated: state.isAuthenticated,
        registerUser,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthState };
