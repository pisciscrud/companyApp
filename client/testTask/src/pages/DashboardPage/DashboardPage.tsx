import { useParams } from "react-router-dom";
import { trpc } from "../../utils/trpcClient";

import {
  DashboardListDepartament,
  DashboardListEmployee,
  DepartmentChart,
} from "../../components/index";
import styles from "./DashboardPage.module.css";

const DashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const employees = trpc.employee.getFiveNewestEmployeesOfCompany.useQuery({
    companyId: +id!,
  });
  const departments = trpc.departament.findLargestDepartaments.useQuery({
    companyId: +id!,
  });

  return (
    <>
      <div className={styles.container}>
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>
        <div className={styles.conteinerItem}>
          {departments.data && (
            <DashboardListDepartament departments={departments.data} />
          )}
          {employees.data && (
            <DashboardListEmployee employees={employees.data} />
          )}
          {departments.data && (
            <DepartmentChart departments={departments.data} />
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
