import React, { useState } from "react";
import "../pageStyles/Auth.css";

const Auth: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);

    const requestBody = {
      query: `
        mutation{
            createUser(userInput: ${user}) {
                _id
                email
            }
        }`
    };

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const { email, password } = user;

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
        <button type="button">Switch to SignUp</button>
      </div>
    </form>
  );
};

export default Auth;
