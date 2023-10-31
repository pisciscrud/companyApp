import styles from "./DashboardListEmployee.module.css";
import { Employee } from "../../shared/interfaces/employee";

interface DashboardListEmployeeProps {
  employees: Employee[];
}

const DashboardListEmployee: React.FC<DashboardListEmployeeProps> = ({
  employees,
}) => {
  return (
    <>
      <div className={styles.dashboardCard}>
        <h2>Newest Employees</h2>
        <ul>
          {employees.map((employee) => (
            <a key={employee.id} href={`employees/info/${employee.id}`}>
              <li key={employee.id} className={styles.dashboardCardItem}>
                {employee.firstName} {employee.lastName} -{" "}
                {new Date(employee.createdAt).toLocaleString()}
              </li>
            </a>
          ))}
        </ul>
      </div>
    </>
  );
};

export default DashboardListEmployee;
