import React, { useEffect, useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("user@gmail.com");
  const [password, setPassword] = useState("2344");
  const navigate = useNavigate();
  const { isAuthenticated, user, login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true});
  }, [navigate, isAuthenticated]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
