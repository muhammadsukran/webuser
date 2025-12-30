import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/logo.png";
import "../../styles/HeaderPrivate.css";

export default function HeaderPrivate() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);



  return (
    <header className="header-private">
      <div className="header-private-left">
        <img src={logo} alt="Logo" className="header-private-logo" />
        <div className="header-private-text">
          <h1>Kementerian Imigrasi dan Pemasyarakatan RI</h1>
          <h2>Direktorat Jenderal Pemasyarakatan</h2>
        </div>
      </div>

            {!open && (
            <button className="hamburger-btn" onClick={() => setOpen(true)}>
                <FiMenu size={28} />
            </button>
            )}


      <nav className={`header-private-nav ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          <FiX size={28} />
        </button>

        <NavLink to="/home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/formulir" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setOpen(false)}>Formulir</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setOpen(false)}>Profile</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"} onClick={() => setOpen(false)}>About</NavLink>

      </nav>

      {open && <div className="menu-overlay" onClick={() => setOpen(false)} />}
    </header>
  );
}
