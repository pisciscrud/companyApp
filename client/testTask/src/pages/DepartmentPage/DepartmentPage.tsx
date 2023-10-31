import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getInfoAboutDepartment } from "../../api/departaments.api";
import { Department } from "../../shared/interfaces/department";
import { AddEmployeeToDepartment } from "../../components";

const DepartmentPage = () => {
  const { idDepartment } = useParams<{ idDepartment: string }>();
  const [department, setDepartment] = useState<Department | null>();
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async (idDepartment: number) => {
    const res = await getInfoAboutDepartment(+idDepartment);
    if (!res) return;
    setDepartment(res.data.result);
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
      <div>
        <h1>Department Info</h1>
        <h3>Name: {department.name}</h3>
        <h3>Description : {department.description}</h3>
        <div>
          <h3>Count of employees: {department.employees?.length}</h3>
          <ul>
            {department.employees?.map((employee) => (
              <div key={employee.id}>
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
              </div>
            ))}
          </ul>
        </div>
        <button onClick={() => handleOpenModal()}>Add new employee</button>
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
