import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllDepartaments, deleteDepartament } from "../../api/departaments.api";
import { Table } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import styles from "./DepartamentPage.module.css";
import UpdateDepartamentModal from '../../components/UpdateDepartamentModal/UpdateDepartamentModal'

const DepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsModalClosed(true);
  };

  const [departments, setDepartments] = useState([]);

  const fetchData = async () => {
    try {
      const response = await getAllDepartaments(id);
      console.log(response.data.result);
      setDepartments(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDepartament = async (idDepartament: number) => {
    await deleteDepartament(idDepartament);
    fetchData();
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

  return (
    <>
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
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.description}</td>
              <td>{new Date(department.createdAt).toLocaleString()}</td>
              <td> {new Date(department.updatedAt).toLocaleString()}</td>
              <td>
                <p>Count of employees: {department.employees.length}</p>
                <ul>
                  {department.employees.map((employee) => (
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
                <button className={styles.deleteButton} onClick={handleOpenModal}>
                  <PencilSquare />
                </button>
                <UpdateDepartamentModal showModal={showModal} handleClose={handleCloseModal} name={department.name} description={department.description} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default DepartmentPage;
