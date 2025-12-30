import "../../styles/Footer.css";
import {
  FaEnvelope,
  FaYoutube,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-left">
          <div><FaEnvelope /> rutanpekanbaru@gmail.com</div>
          <div><FaXTwitter /> RUTANPEKANBARU</div>
          <div><FaYoutube /> HUMASRUTANPEKANBARU</div>
          <div><FaFacebookF /> RUTANPEKANBARU</div>
          <div><FaInstagram /> RUTANPEKANBARU</div>
        </div>

        <div className="footer-right">
          <div className="circle-text">
            <svg viewBox="0 0 200 200">
              <defs>
                <path
                  id="circlePath"
                  d="
                    M 100, 100
                    m -75, 0
                    a 75,75 0 1,1 150,0
                    a 75,75 0 1,1 -150,0
                  "
                />
              </defs>

              <text>
                <textPath href="#circlePath">
                    <tspan fill="#ffffff">E</tspan><tspan fill="#f4d03f">dukatif • </tspan>
                    <tspan fill="#ffffff">R</tspan><tspan fill="#f4d03f">eligius • </tspan>
                    <tspan fill="#ffffff">T</tspan><tspan fill="#f4d03f">ertib • </tspan>
                    <tspan fill="#ffffff">U</tspan><tspan fill="#f4d03f">nggul • </tspan>
                    <tspan fill="#ffffff">A</tspan><tspan fill="#f4d03f">man • </tspan>
                    <tspan fill="#ffffff">H</tspan><tspan fill="#f4d03f">armonis • </tspan>
                    <tspan fill="#ffffff">B</tspan><tspan fill="#f4d03f">ertuah •</tspan>
                </textPath>
              </text>

              <text
                x="100"
                y="112"
                textAnchor="middle"
                className="center-text"
              >
                Bertuah
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © Copyright | 2025, Rutan Pekanbaru. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
