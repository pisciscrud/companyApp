import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInfoAboutEmployee } from "../../api/employees.api";
import { Container } from "react-bootstrap";
import { GetInfoAboutEmployeeOutput } from "../../api/types";

const EmployeePage = () => {
  const { idEmployee } = useParams<{ idEmployee: string }>();
  const [employee, setEmployee] = useState<GetInfoAboutEmployeeOutput>();

  const fetchData = async (idEmployee: number) => {
    const res = await getInfoAboutEmployee({ idEmployee: +idEmployee });
    setEmployee(res);
  };

  useEffect(() => {
    if (!idEmployee) return;
    fetchData(+idEmployee);
  }, [idEmployee]);

  return employee ? (
    <>
      <Container style={{ margin: "30px" }}>
        <h1>Personal Info</h1>
        <h3>
          Full Name: {employee.firstName} {employee.lastName}
        </h3>
        <h3>Position: {employee.position}</h3>
        <a
          style={{ color: "black" }}
          href={`/main/${employee.department?.companyId}/departaments/info/${employee.departmentId}`}
        >
          <h3>Department: {employee.department?.name}</h3>
        </a>
        <h4>
          Date the specialist was added to the database:{" "}
          {new Date(employee.createdAt!).toLocaleString()}
        </h4>
        <h4>Last update: {new Date(employee.updatedAt!).toLocaleString()}</h4>
      </Container>
    </>
  ) : (
    <></>
  );
};
export default EmployeePage;
