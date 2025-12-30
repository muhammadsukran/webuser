import { useEffect, useState } from "react";
import HeaderPrivate from "../components/header/HeaderPrivate";
import Footer from "../components/footer/Footer";
import Lottie from "lottie-react";
import loadingAnim from "../assets/Loading animation blue.json";
import "../styles/formulir.css";
import downloadIcon from "../assets/download.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { wilayah } from "../data/wilayah";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";

export default function Formulir() {
  const [dataSurat, setDataSurat] = useState([]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = JSON.parse(localStorage.getItem("dataSurat")) || [];
      const filtered = stored.filter(
        (d) => d.email === currentUser.email
      );

      setDataSurat(filtered);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentUser.email]);

  const kecamatanList = wilayah.map((w) => w.kecamatan);

  const handleAddDummy = async () => {
    let selectedKecamatan = "";
    let selectedKelurahan = "";

    await MySwal.fire({
      title: "Urus Surat Baru",
      html: `
        <select id="kecamatan" class="swal2-select">
          <option value="">Pilih Kecamatan</option>
          ${kecamatanList
            .map((k) => `<option value="${k}">${k}</option>`)
            .join("")}
        </select>

        <select id="kelurahan" class="swal2-select" disabled>
          <option value="">Pilih Kelurahan</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: "Lanjut",
      cancelButtonText: "Batal",
      didOpen: () => {
        const kecamatanSelect = document.getElementById("kecamatan");
        const kelurahanSelect = document.getElementById("kelurahan");

        kecamatanSelect.addEventListener("change", (e) => {
          selectedKecamatan = e.target.value;
          kelurahanSelect.innerHTML =
            `<option value="">Pilih Kelurahan</option>`;

          const wilayahDipilih = wilayah.find(
            (w) => w.kecamatan === selectedKecamatan
          );

          if (wilayahDipilih) {
            wilayahDipilih.kelurahan.forEach((kel) => {
              const opt = document.createElement("option");
              opt.value = kel;
              opt.textContent = kel;
              kelurahanSelect.appendChild(opt);
            });
            kelurahanSelect.disabled = false;
          }
        });

        kelurahanSelect.addEventListener("change", (e) => {
          selectedKelurahan = e.target.value;
        });
      },
      preConfirm: () => {
        if (!selectedKecamatan || !selectedKelurahan) {
          Swal.showValidationMessage(
            "Kecamatan dan Kelurahan wajib diisi"
          );
          return false;
        }
        return {
          kecamatan: selectedKecamatan,
          kelurahan: selectedKelurahan,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem(
          "formulirDraft",
          JSON.stringify(result.value)
        );
        navigate("/formulir/PengisianFormulir");
      }
    });
  };

  const generatePDF = (form) => {
    const doc = new jsPDF();
    let y = 30;

    doc.addImage(logo, "PNG", 15, 10, 20, 20);

    doc.setFontSize(12);
    doc.text("Kementerian Imigrasi dan Pemasyarakatan RI", 40, 15);
    doc.text("Direktorat Jenderal Pemasyarakatan", 40, 22);
    doc.text("Kantor Wilayah Riau", 40, 29);

    doc.setFontSize(10);
    doc.text(
      "Jl. Sialang Bungkuk No.2, Kota Pekanbaru, Riau 28131",
      40,
      35
    );
    doc.text("Telepon: 0821-7099-2754", 40, 41);

    doc.line(15, 45, 195, 45);

    doc.setFontSize(14);
    doc.text("SURAT JAMINAN KESANGGUPAN", 105, 55, { align: "center" });

    doc.setFontSize(11);
    y = 65;

    const line = (label, value) => {
      doc.text(`${label} : ${value || "-"}`, 20, y);
      y += 7;
    };

    line("Nama Narapidana", form.namaNapi);
    line("Umur", form.umurNapi);
    line("Jenis Kelamin", form.jk);
    line("Agama", form.agama);
    line("Kewarganegaraan", form.kewarganegaraan);
    line("NIK", form.nik);
    line("Perkara", form.perkara);
    line("Pidana", form.pidana);

    y += 5;
    doc.text("DATA PENJAMIN", 20, y);
    y += 7;

    line("Nama Penjamin", form.namaPenjamin);
    line("Umur", form.umurPenjamin);
    line("Alamat", `${form.alamat} RT ${form.rt}/RW ${form.rw}`);
    line("No. Telepon", form.telp);
    line("Pekerjaan", form.pekerjaan);
    line("Hubungan", form.hubungan);
    line("Kecamatan", form.kecamatan);
    line("Kelurahan", form.kelurahan);

    doc.save(`Surat_Jaminan_${form.namaPenjamin}.pdf`);
  };

  return (
    <>
      <HeaderPrivate />

      <main className="formulir-page">
        <div className="formulir-card">
          <button className="btn-urus" onClick={handleAddDummy}>
            Urus Surat Baru
          </button>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Penjamin</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th>Jenis Kelamin</th>
                  <th>Status</th>
                  <th>Status Surat</th>
                  <th>Unduh Surat</th>
                </tr>
              </thead>

              <tbody>
                {dataSurat.length === 0 && (
                  <tr>
                    <td colSpan="8" className="empty">
                      Belum ada data
                    </td>
                  </tr>
                )}

                {dataSurat.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>{item.email}</td>
                    <td>{item.alamat}</td>
                    <td>{item.jk}</td>
                    <td>{item.status}</td>

                    <td>
                      {item.statusSurat === "proses" ? (
                        <span className="badge proses">Proses</span>
                      ) : (
                        <span className="badge selesai">Selesai</span>
                      )}
                    </td>

                    <td className="unduh">
                      {item.statusSurat === "proses" ? (
                        <Lottie
                          animationData={loadingAnim}
                          style={{ width: 40, height: 40 }}
                        />
                      ) : (
                        <button
                          className="btn-unduh"
                          onClick={() =>
                            generatePDF(item.pdfData)
                          }
                        >
                          <img src={downloadIcon} alt="Unduh" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
