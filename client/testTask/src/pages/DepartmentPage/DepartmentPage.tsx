import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInfoAboutDepartment } from "../../api/departaments.api";
import { AddEmployeeToDepartment, Tooltip } from "../../components";
import { Button } from "react-bootstrap";
import styles from "./DepartmentPage.module.css";
import { GetDepartmnetOutput } from "../../api/types";

const DepartmentPage = () => {
  const { idDepartment } = useParams<{ idDepartment: string }>();
  const [department, setDepartment] = useState<GetDepartmnetOutput | null>();
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (idDepartment: number) => {
    const res = await getInfoAboutDepartment({ idDepartament: +idDepartment });
    if (!res) return;
    setDepartment(res);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setIsModalClosed(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  useEffect(() => {
    if (!idDepartment) return;
    fetchData(+idDepartment);
  }, []);
  useEffect(() => {
    if (isModalClosed) {
      if (!idDepartment) return;
      fetchData(+idDepartment);
      setIsModalClosed(false);
    }
  }, [isModalClosed]);

  return department ? (
    <>
      <div className={styles.container}>
        <h1>Department Info</h1>
        <h3>Name: {department.name}</h3>
        <h3>Description : {department.description}</h3>
        <div>
          <h3>Count of employees: {department.employees?.length}</h3>
          <ul>
            {department.employees?.map((employee) => (
              <Tooltip text="Manage employee">
                <a
                  key={employee.id}
                  href={`/main/${department.companyId}/employees/info/${employee.id}`}
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
