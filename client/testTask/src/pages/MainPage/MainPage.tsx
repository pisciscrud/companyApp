import { NavHeader } from "../../components/index";
import { Outlet } from "react-router-dom";
import styles from "./MainPage.module.css";

const MainPage: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <NavHeader />
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
