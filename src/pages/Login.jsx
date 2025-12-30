import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderPublic from "../components/header/HeaderPublic";
import Footer from "../components/footer/Footer";
import FloatingInput from "../components/floating/FloatingInput";
import logo from "../assets/logo.png";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      alert("Username atau password salah");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: user.username,
        email: user.email,
      })
    );

    navigate("/home");
  };

  return (
    <>
      <HeaderPublic />

      <main className="login-page">

        <section className="login-left">
          <img src={logo} alt="Logo" className="login-logo" />
          <h1>Selamat Datang di</h1>
          <h2>WAK ABBAS</h2>
        </section>

        <section className="login-right">
          <div className="login-card">
            <h3 className="login-title">Login</h3>

            <FloatingInput
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <FloatingInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" onClick={handleLogin}>
              Sign In
            </button>

            <p className="login-register">
              Don’t have account?{" "}
              <Link to="/signup">Create account!</Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
