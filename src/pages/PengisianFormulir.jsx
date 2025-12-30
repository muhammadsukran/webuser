import { useState } from "react";
import HeaderPrivate from "../components/header/HeaderPrivate";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import logo from "../assets/logo.png";
import "../styles/pengisianFormulir.css";

export default function PengisianFormulir() {
  const navigate = useNavigate();

  const draftWilayah = JSON.parse(localStorage.getItem("formulirDraft")) || {};

  const [form, setForm] = useState({
    namaNapi: "",
    umurNapi: "",
    jk: "",
    agama: "",
    kewarganegaraan: "",
    nik: "",
    perkara: "",
    pidana: "",

    namaPenjamin: "",
    umurPenjamin: "",
    alamat: "",
    rt: "",
    rw: "",
    telp: "",
    pekerjaan: "",
    hubungan: "",

    namaNapiDijamin: "",
    umurNapiDijamin: "",
    pidanaDi: "",

    pernyataan1: false,
    pernyataan2: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const generatePDF = () => {
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
      doc.text(`${label} : ${value}`, 20, y);
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
    line("No. Telp", form.telp);
    line("Pekerjaan", form.pekerjaan);
    line("Hubungan", form.hubungan);

    y += 5;
    doc.text("Sebagai penjamin narapidana:", 20, y);
    y += 7;

    line("Nama", form.namaNapiDijamin);
    line("Umur", form.umurNapiDijamin);
    line("Menjalani pidana di", form.pidanaDi);

    line("Kecamatan", draftWilayah.kecamatan || "-");
    line("Kelurahan", draftWilayah.kelurahan || "-");

    doc.save(`Surat_Jaminan_${form.namaPenjamin}.pdf`);
  };

  const handleSubmit = () => {
    const dataSurat = JSON.parse(localStorage.getItem("dataSurat")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

    const newData = {
      id: Date.now(),
      nama: form.namaPenjamin,
      email: currentUser.email || "-",
      alamat: form.alamat,
      jk: form.jk,
      status: "Penjamin",
      statusSurat: "proses",

      pdfData: {
        ...form,
        kecamatan: draftWilayah.kecamatan || "-",
        kelurahan: draftWilayah.kelurahan || "-",
      },
    };

    dataSurat.push(newData);
    localStorage.setItem("dataSurat", JSON.stringify(dataSurat));

    setTimeout(() => {
      const update = JSON.parse(localStorage.getItem("dataSurat")) || [];
      update.forEach((d) => {
        if (d.id === newData.id) {
          d.statusSurat = "selesai";
        }
      });
      localStorage.setItem("dataSurat", JSON.stringify(update));
    }, 10000);

    navigate("/formulir");
  };

  return (
    <>
      <HeaderPrivate />

      <main className="pengisian-page">
        <div className="pengisian-card">
          <h3>Surat Pernyataan Narapidana</h3>
          <p>Yang bertanda tangan di bawah ini</p>

          <div className="form-grid">
            <label>Nama</label>
            <input name="namaNapi" onChange={handleChange} />

            <label>Umur</label>
            <input name="umurNapi" onChange={handleChange} />

            <label>Jenis Kelamin</label>
            <select name="jk" onChange={handleChange}>
              <option value="">Pilih</option>
              <option>Pria</option>
              <option>Wanita</option>
            </select>

            <label>Agama</label>
            <select name="agama" value={form.agama} onChange={handleChange}>
              <option value="">Pilih Agama</option>
              <option>Islam</option>
              <option>Kristen</option>
              <option>Konghucu</option>
              <option>Hindu</option>
              <option>Buddha</option>
            </select>

            <label>Kewarganegaraan</label>
            <input name="kewarganegaraan" onChange={handleChange} />

            <label>NIK</label>
            <input name="nik" onChange={handleChange} />

            <label>Perkara</label>
            <input name="perkara" onChange={handleChange} />

            <label>Pidana</label>
            <input name="pidana" onChange={handleChange} />
          </div>

          <h3>Surat Jaminan Kesanggupan Keluarga</h3>
          <p>Yang bertanda tangan di bawah ini</p>

          <div className="form-grid">
            <label>Nama Penjamin</label>
            <input name="namaPenjamin" onChange={handleChange} />

            <label>Umur</label>
            <input name="umurPenjamin" onChange={handleChange} />

            <label>Alamat</label>
            <input name="alamat" onChange={handleChange} />

            <label>RT / RW</label>
            <div className="rt-rw">
              <input name="rt" placeholder="RT" onChange={handleChange} />
              <input name="rw" placeholder="RW" onChange={handleChange} />
            </div>

            <label>No. Telepon</label>
            <input name="telp" onChange={handleChange} />

            <label>Pekerjaan</label>
            <input name="pekerjaan" onChange={handleChange} />

            <label>Hubungan</label>
            <select name="hubungan" onChange={handleChange}>
            <option value="">Pilih Hubungan</option>
              {["Adik", "Kakak", "Orang Tua", "Saudara", "Teman"]
                .sort()
                .map((h) => (
                  <option key={h}>{h}</option>
                ))}
            </select>
          </div>

          <p><strong>adalah sebagai penjamin narapidana</strong></p>

          <div className="form-grid">
            <label>Nama</label>
            <input name="namaNapiDijamin" onChange={handleChange} />

            <label>Umur</label>
            <input name="umurNapiDijamin" onChange={handleChange} />

            <label>Menjalani pidana di</label>
            <input name="pidanaDi" onChange={handleChange} />
          </div>

          <div className="form-grid">
            <label>Upload KK</label>
            <input type="file" />

            <label>Upload KTP</label>
            <input type="file" />

            <label>File tambahan</label>
            <input type="file" />
          </div>

          <div className="checkbox">
            <label>
              <input type="checkbox" name="pernyataan1" onChange={handleChange} />
              Sanggup menjamin sepenuhnya bahwa narapidana tidak melarikan diri
            </label>

            <label>
              <input type="checkbox" name="pernyataan2" onChange={handleChange} />
              Sanggup membimbing dan mengawasi narapidana
            </label>
          </div>

          <div className="form-action">
            <button className="btn-kirim" onClick={handleSubmit}>
              Kirim
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
