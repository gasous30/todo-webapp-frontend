import styles from "./Navbar.module.scss";
import { NavbarData } from "./NavbarData";
import { INavlist } from "./interface";
import { FC } from "react";

const Navlist: FC<INavlist> = ({ val, key }) => {
  return (
    <div
      className={`d-flex align-items-center ${
        window.location.pathname === val.link ? styles.active : ""
      } ${styles.Navlist} `}
      key={key}
      onClick={() => (window.location.pathname = val.link)}
    >
      <div className={styles.Iconlist}>{val.icon}</div>
      <h5>{val.title}</h5>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className={styles.Navbar}>
      <div className={styles.Navlistcontainer}>
        {NavbarData.map((val, key) => {
          return <Navlist val={val} key={key} />;
        })}
      </div>
    </nav>
  );
};

export default Navbar;
