import "../styles/about.css";
import logo from "../assets/logo.png";
import HeaderPrivate from "../components/header/HeaderPrivate";
import Footer from "../components/footer/Footer";

export default function About() {
  return (
    <>
      <HeaderPrivate />

      <main className="about-page">
        <section className="about-container">
          <div className="about-logo">
            <img src={logo} alt="Logo Instansi" />
          </div>

          <div className="about-content">
            <h1>Tentang Kami</h1>

            <p>
              <strong>Rumah Penyimpanan Benda Sitaan Negara (Rupbasan)</strong>
              adalah instansi yang diberi kewenangan untuk menyimpan
              <em> Benda Sitaan Negara (Basan)</em> dan
              <em> Barang Rampasan Negara (Baran)</em>,
              guna menjamin keutuhan, keamanan, dan keselamatan barang
              yang dijadikan sebagai barang bukti dalam proses peradilan pidana,
              hingga adanya putusan hakim yang berkekuatan hukum tetap.
            </p>

            <p>
              Berdasarkan <strong>Pasal 44 ayat (1)</strong> Kitab Undang-Undang
              Hukum Acara Pidana, seluruh benda sitaan dan barang rampasan
              negara wajib disimpan di Rupbasan. Ketentuan ini menegaskan
              pentingnya pengelolaan benda sitaan secara profesional,
              akuntabel, dan bertanggung jawab.
            </p>

            <p>
              Penyimpanan benda sitaan dilaksanakan sesuai tingkat
              pemeriksaan dalam proses peradilan dan berada di bawah
              pengawasan pejabat yang berwenang. Hal ini bertujuan untuk
              mencegah penyalahgunaan wewenang serta menjamin bahwa benda
              sitaan tetap utuh sebagai alat bukti yang sah.
            </p>

            <div className="about-highlight">
              <h3>Komitmen Kami</h3>
              <ul>
                <li>Menjaga keamanan dan keutuhan benda sitaan</li>
                <li>Pelayanan transparan dan akuntabel</li>
                <li>Mendukung proses peradilan yang adil</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
