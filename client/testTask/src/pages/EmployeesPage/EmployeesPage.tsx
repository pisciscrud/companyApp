import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  AddEmployeeModal,
  UpdateEmployeeModal,
  Tooltip,
} from "../../components/index";
import styles from "./EmployeePage.module.css";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import { useDebounce } from "@uidotdev/usehooks";
import { Form, FormControl } from "react-bootstrap";
import { trpc } from "../../utils/trpcClient";

const EmployeeTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [modalStates, setModalStates] = useState<boolean[]>([]);
  const [isModalClosed1] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const employees = trpc.employee.emplyeesByName.useQuery({
    name: debouncedSearchTerm,
    companyId: +id!,
  });
  const departments = trpc.departament.allDepartamentsOfCompany.useQuery({
    companyId: +id!,
  });

  const mutationDelete = trpc.employee.deleteEmployee.useMutation();

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

  useEffect(() => {
    if (isModalClosed) {
      const refetchData = async () => {
        await employees.refetch();
      };
      refetchData();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);

  const handleDeleteEmployee = async (employeeId: number) => {
    await mutationDelete.mutateAsync({ employeeId });
    employees.refetch();
  };

  useEffect(() => {
    if (isModalClosed1) {
      setIsModalClosed(false);
    }
  }, [isModalClosed1]);

  useEffect(() => {
    employees.refetch();
  }, [debouncedSearchTerm]);

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
        <Form style={{ marginTop: "15px" }}>
          <FormControl
            name="search"
            type="input"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
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
            {employees &&
              departments.data &&
              employees.data &&
              employees.data.map((employee, index) => (
                <tr key={employee.id}>
                  <td>
                    <Tooltip text="Manage employee">
                      <a
                        key={employee.id}
                        href={`employees/info/${employee.id}`}
                        className={styles.linkToEmployee}
                      >
                        {employee.firstName}
                      </a>
                    </Tooltip>
                  </td>
                  <td>{employee.lastName}</td>
                  <td>{employee.position}</td>
                  <td>{new Date(employee.createdAt).toLocaleString()}</td>
                  <td>{new Date(employee.updatedAt).toLocaleString()}</td>
                  <td>
                    <Tooltip text="Manage department">
                      <a
                        key={employee.id}
                        href={`departaments/info/${employee.department?.id}`}
                        className={styles.linkToEmployee}
                      >
                        {employee.department?.name}
                      </a>
                    </Tooltip>
                  </td>
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
                      departments={departments.data}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        {departments.data && (
          <AddEmployeeModal
            departments={departments.data}
            showModal={showModal}
            handleClose={handleCloseModalAddEmployee}
          />
        )}
      </div>
    </>
  );
};
export default EmployeeTable;
