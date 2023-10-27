import React, { useEffect, useState } from "react";

import NavHeader from "../../components/NavHeader/NavHeader";
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
