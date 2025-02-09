import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
  e.preventDefault();

  // Validation
  if (!email.includes("@gmail.com")) {
    setError("Email must contain '@gmail.com'");
    return;
  }
  if (password.length < 6) {
    setError("Password must be at least 6 characters long");
    return;
  }

  // Retrieve stored user credentials
  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  // Check if credentials match
  if (email !== storedEmail || password !== storedPassword) {
    setError("Invalid credentials");
    return;
  }

  // Store login state
  localStorage.setItem("isLoggedIn", "true");
  navigate("/");
  window.location.reload(); // Refresh to update navbar state
};


  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email or Phone"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p className="forgot-password"><a href="/forgot-password">Forgot Password?</a></p>
        <button type="submit">Login</button>
      </form>
      <p className="switch-auth">
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
};

export default Login;
