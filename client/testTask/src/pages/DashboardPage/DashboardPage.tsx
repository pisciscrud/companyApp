import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  GetFiveLargestDepartamentsOutput,
  GetFiveNewestEmployeesOfCompanyOutput,
} from "../../api/types";

import {
  DashboardListDepartament,
  DashboardListEmployee,
  DepartmentChart,
} from "../../components/index";
import styles from "./DashboardPage.module.css";
import { getFiveLargestDepartaments } from "../../api/departaments.api";
import { getFiveNewestEmployeesOfCompany } from "../../api/employees.api";

const DashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employees, setEmployees] =
    useState<GetFiveNewestEmployeesOfCompanyOutput>([]);
  const [departaments, setDepartments] =
    useState<GetFiveLargestDepartamentsOutput>([]);

  const fetchData = async (id: number) => {
    const [departaments, employees] = await Promise.all([
      getFiveLargestDepartaments({ idCompany: id }),
      getFiveNewestEmployeesOfCompany({ companyId: id }),
    ]);
    setDepartments(departaments);
    setEmployees(employees);
  };

  useEffect(() => {
    if (!id) return;
    fetchData(+id);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <div className={styles.conteinerItem}>
          <DashboardListDepartament departments={departaments} />
          <DashboardListEmployee employees={employees} />
          <DepartmentChart departments={departaments} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
