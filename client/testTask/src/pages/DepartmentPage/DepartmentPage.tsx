import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AddEmployeeToDepartment, Tooltip } from "../../components";
import { Button } from "react-bootstrap";
import styles from "./DepartmentPage.module.css";
import { trpc } from "../../utils/trpcClient";
import { EmployeeOutput } from "../../api/types";

const DepartmentPage = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const department = trpc.departament.findInfoAboutDepartament.useQuery({
    departmentId: +departmentId!,
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setIsModalClosed(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (isModalClosed) {
      if (!departmentId) return;
      department.refetch();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);

  return department.data ? (
    <>
      <div className={styles.container}>
        <h1>Department Info</h1>
        <h3>Name: {department.data.name}</h3>
        <h3>Description : {department.data.description}</h3>
        <div>
          <h3>Count of employees: {department.data.employees?.length}</h3>
          <ul>
            {department.data.employees?.map((employee: EmployeeOutput) => (
              <Tooltip text="Manage employee" key={employee.id}>
                <a
                  key={employee.id}
                  href={`/main/${department.data.companyId}/employees/info/${employee.id}`}
                  style={{ color: "black" }}
                >
                  <li>
                    {employee.firstName} {employee.lastName}
                  </li>
                  {employee.position === "HEAD" ? (
                    <p
                      style={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {employee.position}
                    </p>
                  ) : (
                    <p style={{ fontSize: "12px", fontWeight: "bold" }}>
                      {employee.position}
                    </p>
                  )}
                </a>
              </Tooltip>
            ))}
          </ul>
        </div>
        <Button className={styles.addButton} onClick={() => handleOpenModal()}>
          Add new employee
        </Button>
        <AddEmployeeToDepartment
          showModal={showModal}
          handleClose={handleCloseModal}
        ></AddEmployeeToDepartment>
      </div>
    </>
  ) : (
    <></>
  );
};
export default DepartmentPage;
