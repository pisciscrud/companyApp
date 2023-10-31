import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  getAllEmployeesOfCompany,
  getEmployeesByName,
  deleteEmployee,
} from "../../api/employees.api";
import {
  EmployeeSearch,
  AddEmployeeModal,
  UpdateEmployeeModal,
} from "../../components/index";
import styles from "./EmployeePage.module.css";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import { getAllDepartaments } from "../../api/departaments.api";
import { Employee } from "../../shared/interfaces/employee";
import { Department } from "../../shared/interfaces/department";

const EmployeeTable: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [modalStates, setModalStates] = useState<boolean[]>([]);
  const [isModalClosed1] = useState(false);

  const handleOpenModalUpdateEmployee = (index: number) => {
    setModalStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = true;
      return updatedStates;
    });
  };

  const handleCloseModalUpdateEmployee = (index: number) => {
    setModalStates((prevStates) => {
      const updatedStates = [...prevStates];
      updatedStates[index] = false;
      return updatedStates;
    });
    setIsModalClosed(true);
  };

  const handleOpenModalAddEmployee = () => {
    setShowModal(true);
  };

  const handleCloseModalAddEmployee = () => {
    setShowModal(false);
    setIsModalClosed(true);
  };

  const fetchData = async () => {
    try {
      if (!id) return;
      const [employees, departments] = await Promise.all([
        getAllEmployeesOfCompany(+id),
        getAllDepartaments(+id),
      ]);
      setModalStates(new Array(employees.data.result.length).fill(false));
      if (departments) {
        setDepartments(departments);
      }
      setEmployees(employees.data.result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (isModalClosed) {
      fetchData();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);
  const handleSearch = async (name: string) => {
    const response = await getEmployeesByName(name);
    setEmployees(response.data.result);
  };
  const handleDeleteEmployee = async (idEmployee: number) => {
    await deleteEmployee(idEmployee);
    fetchData();
  };

  useEffect(() => {
    if (isModalClosed1) {
      fetchData();
      setIsModalClosed(false);
    }
  }, [isModalClosed1]);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.headerContainer}>
        <h1 style={{ marginLeft: "30px" }}>Employees of Company</h1>
        <Button
          className={styles.addEmployeeButton}
          onClick={handleOpenModalAddEmployee}
        >
          Add employee
        </Button>
        <EmployeeSearch handleSearch={handleSearch} />
      </div>
      <div style={{ marginTop: "15px" }}>
        <Table striped bordered>
          <thead style={{ marginTop: "20px" }}>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Department</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.position}</td>
                <td>{new Date(employee.createdAt).toLocaleString()}</td>
                <td>{new Date(employee.updatedAt).toLocaleString()}</td>
                <td>{employee.department?.name}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    <Trash />
                  </button>
                </td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleOpenModalUpdateEmployee(index)}
                  >
                    <PencilSquare />
                  </button>
                  <UpdateEmployeeModal
                    showModal={modalStates[index]}
                    handleClose={() => handleCloseModalUpdateEmployee(index)}
                    employee={employee}
                    departments={departments}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <AddEmployeeModal
          departments={departments}
          showModal={showModal}
          handleClose={handleCloseModalAddEmployee}
        ></AddEmployeeModal>
      </div>
    </>
  );
};
export default EmployeeTable;
