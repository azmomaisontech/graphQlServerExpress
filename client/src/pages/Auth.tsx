import React, { useState, useContext } from "react";
import { AuthContext } from "../context/GraphqlState";
import "../pageStyles/Auth.css";

const Auth: React.FC = () => {
  const graphqlContext = useContext(AuthContext);
  const { loginUser, registerUser } = graphqlContext;
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [isLogin, setIsLogin] = useState(true);

  const { email, password } = user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLogin) {
      if (loginUser) {
        loginUser(user);
      }
    } else {
      if (registerUser) {
        registerUser(user);
      }
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
