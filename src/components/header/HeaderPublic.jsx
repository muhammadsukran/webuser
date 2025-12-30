import "../../styles/Header.css";
import logo from "../../assets/logo.png";

const HeaderPublic = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header-logo" />
      <div className="header-text">
        <h1>Kementerian Imigrasi dan Pemasyarakatan RI</h1>
        <h2>Direktorat Jenderal Pemasyarakatan</h2>
      </div>
    </header>
  );
};

export default HeaderPublic;
