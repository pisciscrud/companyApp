import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllDepartaments,
  deleteDepartament,
} from "../../api/departaments.api";
import { Table, Button } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import styles from "./DepartamentPage.module.css";
import {
  UpdateDepartmentModal,
  AddDepartmentModal,
} from "../../components/index";
import { Department } from "../../shared/interfaces/department";

const DepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [modalStates, setModalStates] = useState<boolean[]>([]);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      if (!id) return;
      const response = await getAllDepartaments(+id);
      if (!response) return;
      setDepartments(response);
      setModalStates(new Array(response.length).fill(false));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDepartament = async (idDepartament: number) => {
    await deleteDepartament(idDepartament);
    fetchData();
  };

  const handleOpenModal = (index: number) => {
    setModalStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = true;
      return updatedStates;
    });
  };

  const handleCloseModal = (index: number) => {
    setModalStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setIsModalClosed(true);
  };

  const handleCloseModal1 = () => {
    setShowModal(false);
    setIsModalClosed(true);
  };

  const handleOpenModal1 = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (isModalClosed) {
      fetchData();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.headerContainer}>
        <h1 style={{ marginLeft: "30px" }}>Departments of Company</h1>
        <Button className={styles.addEmployeeButton} onClick={handleOpenModal1}>
          Add department
        </Button>
      </div>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Employees</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.description}</td>
              <td>{new Date(department.createdAt).toLocaleString()}</td>
              <td>{new Date(department.updatedAt).toLocaleString()}</td>
              <td>
                <p>Count of employees: {department.employees?.length}</p>
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
              </td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteDepartament(department.id)}
                >
                  <Trash />
                </button>
              </td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleOpenModal(index)}
                >
                  <PencilSquare />
                </button>
                <UpdateDepartmentModal
                  showModal={modalStates[index]}
                  handleClose={() => handleCloseModal(index)}
                  updateInfo={department}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddDepartmentModal
        showModal={showModal}
        handleClose={handleCloseModal1}
        id={id}
      />
    </>
  );
};

export default DepartmentPage;
