import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiEdit } from "react-icons/fi";
import Swal from "sweetalert2";
import logo from "../assets/profile.png";
import "../styles/profile.css";
import HeaderPrivate from "../components/header/HeaderPrivate";
import Footer from "../components/footer/Footer";

export default function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!currentUser) {
      navigate("/login");
      return;
    }

    const foundUser = users.find(
      (u) => u.username === currentUser.username
    );

    if (!foundUser) {
      navigate("/login");
      return;
    }

    setUser(foundUser);
  }, [navigate]);

  if (!user) return null;

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.username === user.username ? user : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEdit(false);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Profile berhasil diperbarui",
      confirmButtonColor: "#2563eb",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUser({ ...user, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <HeaderPrivate />

      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-photo">
            <img src={user.photo || logo} alt="Profile" />

            {edit && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            )}
          </div>

          <div className="profile-form">
            <ProfileInput label="Username" value={user.username} disabled />

            <ProfileInput
              label="Email"
              value={user.email || ""}
              disabled={!edit}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
            />

            <ProfileInput
              label="Alamat"
              value={user.alamat || ""}
              disabled={!edit}
              onChange={(e) =>
                setUser({ ...user, alamat: e.target.value })
              }
            />

            <ProfileInput
              label="RT/RW"
              value={user.rt_rw || ""}
              disabled={!edit}
              onChange={(e) =>
                setUser({ ...user, rt_rw: e.target.value })
              }
            />

            <ProfileInput
              label="Kelurahan"
              value={user.kelurahan || ""}
              disabled={!edit}
              onChange={(e) =>
                setUser({ ...user, kelurahan: e.target.value })
              }
            />

            <ProfileInput
              label="Kecamatan"
              value={user.kecamatan || ""}
              disabled={!edit}
              onChange={(e) =>
                setUser({ ...user, kecamatan: e.target.value })
              }
            />
          </div>

          <div className="profile-actions">
            {edit ? (
              <button className="btn save" onClick={handleSave}>
                Simpan
              </button>
            ) : (
              <button className="btn edit" onClick={() => setEdit(true)}>
                <FiEdit /> Edit Profile
              </button>
            )}

            <button className="btn logout" onClick={handleLogout}>
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

function ProfileInput({ label, ...props }) {
  return (
    <div className="profile-input">
      <label>{label}</label>
      <input {...props} />
    </div>
  );
}
