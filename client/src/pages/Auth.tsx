import React, { useState, useContext } from "react";
import { AuthContext } from "../context/GraphqlState";
import "../pageStyles/Auth.css";
import { async } from "q";

const Auth: React.FC = () => {
  const graphqlContext = useContext(AuthContext);
  const { loginUser } = graphqlContext;
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [isLogin, setIsLogin] = useState(true);

  const { email, password } = user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let requestBody;
    if (isLogin) {
      requestBody = {
        query: `
              mutation{
                  login(loginInput: {email: "${email}" , password: "${password}"}) {
                      userId
                      token
                      tokenExpiration
                  }
              }`
      };
    } else {
      requestBody = {
        query: `
                  mutation{
                      createUser(userInput: {email: "${email}" , password: "${password}"}) {
                          _id
                          email
                      }
                  }`
      };
    }
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
        const { token, userId, tokenExpiration } = resData.data.login;
        if (loginUser) {
          loginUser({ token, userId, tokenExpiration });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" value={email} onChange={handleChange} id="email" required />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={handleChange} id="password" required />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button" onClick={switchModeHandler}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </form>
  );
};

export default Auth;
