import style from "./Footer.module.css";

// icon
import { Instagram, Twitter, Youtube } from "react-feather";
// component
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={style.footers}>
      <div className={style.container_footer}>
        <div className={style.about}>
          <h3>Lapak Belajar.</h3>
          <small>oleh maars</small>
          <div className={style.sosmed}>
            <Link href="/">
              <a>
                <Instagram color="#696969" size={18} />
              </a>
            </Link>
            <Link href="/">
              <a>
                <Twitter color="#696969" size={18} />
              </a>
            </Link>
            <Link href="/">
              <a>
                <Youtube color="#696969" size={18} />
              </a>
            </Link>
          </div>
        </div>
        <div className={style.menu}>
          <div className={style.box_menu}>
            <h4>Company</h4>
            <a href="/">Tentang</a>
            <a href="/">Tim</a>
          </div>
          <div className={style.box_menu}>
            <h4>Produk</h4>
            <a href="/">Diskusi</a>
            <a href="/">Privat</a>
            <a href="/">Blog</a>
          </div>
          <div className={style.box_menu}>
            <h4>Ruang</h4>
            <a href="/">Customer</a>
            <a href="/">Investor</a>
          </div>
          <div className={style.box_menu}>
            <h4>Kebijakan</h4>
            <a href="/">Term of Service</a>
            <a href="/">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
