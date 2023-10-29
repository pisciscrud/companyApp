import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NavHeader.module.css";
const NavHeader: React.FC = () => {
  const handleLogoutClick = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className={styles.navHeader}>
      <Nav className={styles.navHeader}>
        <Link className={styles.link} to="departaments">
          Departaments
        </Link>
        <Link className={styles.link} to="employees">
          Employees
        </Link>
        <Link className={styles.link} to="dashboard">
          Dashboard
        </Link>
        <a className={styles.link} href="/companies">
          All companies
        </a>
        <a className={styles.link} href="/login" onClick={handleLogoutClick}>
          Log out
        </a>
      </Nav>
    </div>
  );
};

export default NavHeader;
