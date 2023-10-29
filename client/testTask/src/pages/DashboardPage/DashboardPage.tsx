import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFiveLargestDepartaments } from "../../api/departaments.api";
import { getFiveNewestEmployeesOfCompany } from "../../api/employees.api";
import {
  DashboardListDepartament,
  DashboardListEmployee,
  DepartmentChart,
} from "../../components/index";
import styles from "./DashboardPage.module.css";
import { Employee } from "../../shared/interfaces/employee";
import { Department } from "../../shared/interfaces/department";

const DashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departaments, setDepartments] = useState<Department[]>([]);

  const fetchData = async (id: number) => {
    const [departaments, employees] = await Promise.all([
      getFiveLargestDepartaments(id),
      getFiveNewestEmployeesOfCompany(id),
    ]);
    setDepartments(departaments.data.result);
    setEmployees(employees.data.result);
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
          <DashboardListDepartament id={id} departments={departaments} />
          <DashboardListEmployee
            id={id}
            employees={employees}
          ></DashboardListEmployee>
          <DepartmentChart departments={departaments} />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
