import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate } from "../../../node_modules/react-router/dist/index";
import { Link } from "react-router-dom";
import styles from "./NavHeader.module.css";
const NavHeader: React.FC = () => {
  return (
    <Nav className={styles.navHeader}>
      <Link className={styles.link} to="departaments">Departaments</Link>
      <Link className={styles.link} to="employees">Employees</Link>
      <Link className={styles.link} to="dashboard">Dashboard</Link>
      <Link className={styles.link} to="companies">Companies</Link>
      <Link  className={styles.link} to="logout">Log out</Link>
    </Nav>
  );
};

export default NavHeader;
