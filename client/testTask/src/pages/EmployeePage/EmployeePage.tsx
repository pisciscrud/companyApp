import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { trpc } from "../../utils/trpcClient";

const EmployeePage = () => {
  const { idEmployee } = useParams<{ idEmployee: string }>();
  const employee = trpc.employee.findInfoAboutEmployee.useQuery({
    employeeId: +idEmployee!,
  });

  return employee.data ? (
    <>
      <Container style={{ margin: "30px" }}>
        <h1>Personal Info</h1>
        <h3>
          Full Name: {employee.data.firstName} {employee.data.lastName}
        </h3>
        <h3>Position: {employee.data.position}</h3>
        <a
          style={{ color: "black" }}
          href={`/main/${employee.data.department?.companyId}/departaments/info/${employee.data.departmentId}`}
        >
          <h3>Department: {employee.data.department?.name}</h3>
        </a>
        <h4>
          Date the specialist was added to the database:{" "}
          {new Date(employee.data.createdAt!).toLocaleString()}
        </h4>
        <h4>
          Last update: {new Date(employee.data.updatedAt!).toLocaleString()}
        </h4>
      </Container>
    </>
  ) : (
    <></>
  );
};
export default EmployeePage;
