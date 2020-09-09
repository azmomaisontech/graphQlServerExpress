import React, { useReducer, createContext } from "react";
import { GraphqlReducer } from "./graphqlReducer";
import { ContextProps, Props, FormData, EventEnum, GraphlqlStateProps, CreateEvent } from "./type";

const initialState: GraphlqlStateProps = {
  userId: null,
  token: null,
  isAuthenticated: false,
  success: false,
  events: []
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
          type: EventEnum.loginUser,
          payload: resData.data.login
        });
      } else {
        dispatch({
          type: EventEnum.registerUser
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
        type: EventEnum.clearSuccess
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
      type: EventEnum.logoutUser
    });
  };

  const createEvent = async (formData: CreateEvent) => {
    const eventBody = {
      query: `
              mutation{
                  createEvent(eventInput: ${formData} ) {
                    _id
                    title
                    description
                    price
                    date
                    creator{
                      _id
                      email
                    }
                  }
              }`
    };

    try {
      const res = await fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(eventBody),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state.token
        }
      });

      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed");
      }
      const resData = await res.json();
      console.log(resData);
      dispatch({
        type: EventEnum.createEvent,
        payload: resData as object
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userId: state.userId,
        token: state.userId,
        isAuthenticated: state.isAuthenticated,
        registerUser,
        loginUser,
        logoutUser,
        createEvent
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthState };
