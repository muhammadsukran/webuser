import { useState } from "react";
import HeaderPrivate from "../components/header/HeaderPrivate";
import Footer from "../components/footer/Footer";
import "../styles/home.css";

import img1 from "../assets//1.png";
import img2 from "../assets//2.png";
import img3 from "../assets//3.png";

const images = [img1, img2, img3];

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <>
      <HeaderPrivate />

      <main className="home-page">
        <section className="home-hero">
          <div className="carousel-wrapper">
            <button className="carousel-btn left" onClick={prevSlide}>
              ❮
            </button>

            <img
              src={images[activeIndex]}
              alt="Carousel"
              className="carousel-image"
              onClick={() => setPreviewImage(images[activeIndex])}
            />

            <button className="carousel-btn right" onClick={nextSlide}>
              ❯
            </button>
          </div>

          <h1>Raih Pengalaman Seru & Menantang</h1>
          <h1>Magang di Diskominfotik Riau!</h1>
          <p>Yuk, Ikutan Magang Seru di Diskominfotik Provinsi Riau!</p>
        </section>

        <section className="home-schedule">
          <div className="schedule-card">
            <h3>Sesi 1 - Pagi</h3>
            <table>
              <thead>
                <tr>
                  <th>Hari</th>
                  <th>Jam</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Senin</td><td>09.00 - 11.30</td></tr>
                <tr><td>Selasa</td><td>09.00 - 11.30</td></tr>
                <tr><td>Rabu</td><td>09.00 - 11.30</td></tr>
                <tr><td>Kamis</td><td>09.00 - 11.30</td></tr>
                <tr><td>Jum'at</td><td>09.00 - 11.30</td></tr>
              </tbody>
            </table>
          </div>

          <div className="schedule-card">
            <h3>Sesi 2 - Siang</h3>
            <table>
              <thead>
                <tr>
                  <th>Hari</th>
                  <th>Jam</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Senin</td><td>13.30 - 15.00</td></tr>
                <tr><td>Selasa</td><td>13.30 - 15.00</td></tr>
                <tr><td>Rabu</td><td>13.30 - 15.00</td></tr>
                <tr><td>Kamis</td><td>13.30 - 15.00</td></tr>
                <tr><td>Jum'at</td><td>13.30 - 15.00</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {previewImage && (
        <div className="image-modal" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" />
        </div>
      )}

      <Footer />
    </>
  );
}
