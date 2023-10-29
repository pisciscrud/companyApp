import React, { useEffect, useState } from "react";
import styles from "../DashboardListEmployee/DashboardListEmployee.module.css";

const DashboardListDepartament: React.FC = ({ departments }) => {
  return (
    <>
      <div className={styles.dashboardCard}>
        <h2>Largest departments</h2>
        <ul>
          {departments.map((department) => (
               <a key={department.id} href={`departaments/info/${department.id}`}>
            <div key={department.id} className={styles.dashboardCardItem}>
              <li>
                <div>
                  <h6> Name: {department.name}</h6>
                  <h6> Count of employees: {department.employees.length} </h6>
                </div>
              </li>
            </div>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DashboardListDepartament;
