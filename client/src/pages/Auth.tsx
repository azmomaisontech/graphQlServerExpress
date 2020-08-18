import React from "react";
import "../pageStyles/Auth.css";

const Auth: React.FC = () => {
  return (
    <form className="auth-form">
      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" name="email" id="email" />
      </div>
      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
        <button type="button">Switch to SignUp</button>
      </div>
    </form>
  );
};

export default Auth;
