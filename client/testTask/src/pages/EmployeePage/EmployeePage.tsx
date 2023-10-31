import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInfoAboutEmployee } from "../../api/employees.api";
import { Employee } from "../../shared/interfaces/employee";
import { Container } from "react-bootstrap";

const EmployeePage = () => {
  const { idEmployee } = useParams<{ idEmployee: string }>();
  const [employee, setEmployee] = useState<Employee | null>();

  const fetchData = async (idEmployee: number) => {
    const res = await getInfoAboutEmployee(+idEmployee);
    setEmployee(res.data.result as Employee);
  };

  useEffect(() => {
    if (!idEmployee) return;
    fetchData(+idEmployee);
  }, [idEmployee]);

  return employee ? (
    <>
      <Container style={{ margin: "30px" }}>
        <h1>Personal Info</h1>
        <h3>Name: {employee.firstName}</h3>
        <h3>Surname: {employee.lastName}</h3>
        <h4>
          Date the specialist was added to the database:{" "}
          {new Date(employee.createdAt).toLocaleString()}
        </h4>
        <h4>Last update: {new Date(employee.updatedAt).toLocaleString()}</h4>
      </Container>
    </>
  ) : (
    <></>
  );
};
export default EmployeePage;
