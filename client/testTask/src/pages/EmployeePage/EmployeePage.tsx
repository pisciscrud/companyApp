import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getAllEmployeesOfCompany,
  getEmployeesByName,
  deleteEmployee,
} from "../../api/employees.api";
import EmployeeSearch from "../../components/EmployeeSearch/EmployeeSearch";
import styles from "./EmployeePage.module.css";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import AddEmployeeModal from "../../components/AddEmployeeModal/AddEmployeeModal";

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState([]);
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

  const fetchData = async () => {
    try {
      const response = await getAllEmployeesOfCompany(id);
      setEmployees(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSearch = async (name: string) => {
    const response = await getEmployeesByName(name);
    setEmployees(response.data.result);
  };
  const handleDeleteEmployee = async (idEmployee: number) => {
    await deleteEmployee(idEmployee);
    fetchData();
  };
  return (
    <>
      <div className={styles.headerContainer}>
        <h1 style={{ marginLeft: "30px" }}>Employees of Company</h1>
        <Button className={styles.addEmployeeButton} onClick={handleOpenModal}>
          Add employee
        </Button>
        <EmployeeSearch handleSearch={handleSearch} />
      </div>
      <div style={{ marginTop: "15px" }}>
        <Table striped bordered>
          <thead styel={{ marginTop: "20px" }}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Created At</th>
              <th>Department</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.position}</td>
                <td>{new Date(employee.createdAt).toLocaleString()}</td>
                <td>{employee.department.name}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddEmployeeModal showModal={showModal} handleClose={handleCloseModal}></AddEmployeeModal>
      </div>
    </>
  );
};
export default EmployeeTable;
