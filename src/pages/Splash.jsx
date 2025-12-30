import "../styles/Splash.css";
import HeaderPublic from "../components/header/HeaderPublic";
import Footer from "../components/footer/Footer";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom"; // ⬅️ WAJIB

const Splash = () => {
  const navigate = useNavigate(); // ⬅️ WAJIB

  return (
    <>
      <HeaderPublic />

      <main className="splash">
        <div className="splash-content">
          <img src={logo} className="splash-logo" alt="Logo" />
          <p>Selamat Datang di</p>
          <h1>WAK ABBAS</h1>

          <button
            className="btn-masuk"
            onClick={() => navigate("/login")}
          >
            Masuk
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Splash;
