import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoCloseCircleOutline } from "react-icons/io5";
import HeaderPublic from "../components/header/HeaderPublic";
import Footer from "../components/footer/Footer";
import FloatingInput from "../components/floating/FloatingInput";
import logo from "../assets/logo.png";
import { wilayah } from "../data/wilayah";
import "../styles/signup.css";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nik, setNik] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");

  const [showKecamatan, setShowKecamatan] = useState(false);
  const [showKelurahan, setShowKelurahan] = useState(false);
  const [errors, setErrors] = useState({});

  const kecamatanRef = useRef(null);
  const kelurahanRef = useRef(null);

  const kecamatanList = wilayah.map((w) => w.kecamatan);
  const selectedWilayah = wilayah.find((w) => w.kecamatan === kecamatan);
  const kelurahanList = selectedWilayah ? selectedWilayah.kelurahan : [];

  useEffect(() => {
    const handler = (e) => {
      if (kecamatanRef.current && !kecamatanRef.current.contains(e.target)) {
        setShowKecamatan(false);
      }
      if (kelurahanRef.current && !kelurahanRef.current.contains(e.target)) {
        setShowKelurahan(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleRegister = () => {
    let newErrors = {};

    if (!username) newErrors.username = "Kolom wajib diisi !";
    if (!email) newErrors.email = "Kolom wajib diisi !";
    if (!password) newErrors.password = "Kolom wajib diisi !";

    if (!nik) newErrors.nik = "Kolom wajib diisi !";
    else if (nik.length !== 16) newErrors.nik = "NIK harus 16 digit angka";

    if (!kecamatan) newErrors.kecamatan = "Kolom wajib diisi !";
    if (!kelurahan) newErrors.kelurahan = "Kolom wajib diisi !";

    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(
      (u) => u.username === username || u.email === email
    );

    if (exists) {
      alert("Username atau Email sudah terdaftar");
      return;
    }

    const newUser = {
      username,
      email,
      password,
      nik,
      kecamatan,
      kelurahan,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/login");
  };

  return (
    <>
      <HeaderPublic />

      <main className="signup-page">
        <section className="signup-left">
          <img src={logo} className="signup-logo" />
          <h1>Selamat Datang di</h1>
          <h2>WAK ABBAS</h2>
        </section>

        <section className="signup-right">
          <div className="signup-card">
            <h3 className="signup-title">Create Account</h3>

            <FloatingInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} error={errors.username} />
            <FloatingInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />

            <div className={`floating-input ${password ? "has-value" : ""}`}>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              {errors.password && <small className="helper-text error">{errors.password}</small>}
            </div>

            <div className={`floating-input ${nik ? "has-value" : ""}`}>
              <input
                value={nik}
                inputMode="numeric"
                onChange={(e) => {
                  const onlyNum = e.target.value.replace(/\D/g, "");
                  if (onlyNum.length <= 16) setNik(onlyNum);
                }}
              />
              <label>NIK</label>
              {errors.nik && <small className="helper-text error">{errors.nik}</small>}
            </div>

            <div className={`dropdown-field ${kecamatan ? "has-value" : ""}`} ref={kecamatanRef}>
              <input value={kecamatan} readOnly onFocus={() => setShowKecamatan(true)} />
              <label>Kecamatan</label>
              {kecamatan && <span className="clear-btn" onClick={() => { setKecamatan(""); setKelurahan(""); }}><IoCloseCircleOutline /></span>}
              {showKecamatan && (
                <ul className="dropdown-list">
                  {kecamatanList.map((k) => (
                    <li key={k} onClick={() => { setKecamatan(k); setShowKecamatan(false); }}>{k}</li>
                  ))}
                </ul>
              )}
              {errors.kecamatan && <small className="helper-text error">{errors.kecamatan}</small>}
            </div>

            <div className={`dropdown-field ${kelurahan ? "has-value" : ""}`} ref={kelurahanRef}>
              <input value={kelurahan} readOnly disabled={!kecamatan} onFocus={() => kecamatan && setShowKelurahan(true)} />
              <label>Kelurahan</label>
              {kelurahan && <span className="clear-btn" onClick={() => setKelurahan("")}><IoCloseCircleOutline /></span>}
              {showKelurahan && (
                <ul className="dropdown-list">
                  {kelurahanList.map((k) => (
                    <li key={k} onClick={() => { setKelurahan(k); setShowKelurahan(false); }}>{k}</li>
                  ))}
                </ul>
              )}
              {errors.kelurahan && <small className="helper-text error">{errors.kelurahan}</small>}
            </div>

            <button className="signup-btn" onClick={handleRegister}>Register</button>

            <p className="signup-login">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
