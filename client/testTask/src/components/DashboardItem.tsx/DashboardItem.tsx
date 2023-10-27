import React, { useEffect, useState } from "react";
import { getFiveLargestDepartaments } from "../../api/departaments.api";
import styles from "./dashboard.module.css";

const DashboardItem: React.FC = () => {
  const [topDepartments, setTopDepartments] = useState([]);
  const [newEmployees, setNewEmployees] = useState([]);

  useEffect(() => {
    fetchTopDepartments();
    fetchNewEmployees();
  }, []);

  const fetchTopDepartments = async () => {
    try {
      const response = await getFiveLargestDepartaments()
      setTopDepartments(response.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNewEmployees = async () => {
    try {
      const response = await getNewEmployees();
      setNewEmployees(response.data.slice(0, 5));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Самые большие отделы</h2>
        <ul className={styles.list}>
          {topDepartments.map((department) => (
            <li key={department.id} className={styles.item}>
              {department.name}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.heading}>Самые новые сотрудники</h2>
        <ul className={styles.list}>
          {newEmployees.map((employee) => (
            <li key={employee.id} className={styles.item}>
              {employee.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardItem;