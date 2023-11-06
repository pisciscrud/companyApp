import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { Trash, PencilSquare } from "react-bootstrap-icons";
import styles from "./DepartamentPage.module.css";
import {
  UpdateDepartmentModal,
  AddDepartmentModal,
  Tooltip,
} from "../../components/index";
import { trpc } from "../../utils/trpcClient";
import { DepartmnetOutput, EmployeeOutput } from "../../api/types";

const DepartmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [modalStates, setModalStates] = useState<boolean[]>([]);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const departments = trpc.departament.allDepartamentsOfCompany.useQuery({
    companyId: +id!,
  });
  const mutationDelete = trpc.departament.deleteDepartament.useMutation();

  const handleDeleteDepartament = async (departmentId: number) => {
    await mutationDelete.mutateAsync({ departmentId });
    departments.refetch();
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
      const refetchData = async () => {
        await departments.refetch();
      };
      refetchData();
      setIsModalClosed(false);
    }
  }, [isModalClosed]);

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
          {departments.data &&
            departments.data.map(
              (department: Required<DepartmnetOutput>, index: number) => (
                <tr key={department.id}>
                  <td>
                    <Tooltip key={department.id} text="Manage department">
                      <a
                        key={department.id}
                        className={styles.linkDepartment}
                        href={`departaments/info/${department.id}`}
                      >
                        {department.name}
                      </a>
                    </Tooltip>
                  </td>

                  <td>{department.description}</td>
                  <td>{new Date(department.createdAt).toLocaleString()}</td>
                  <td>{new Date(department.updatedAt).toLocaleString()}</td>
                  <td>
                    <p>Count of employees: {department.employees?.length}</p>
                    <ul>
                      {department.employees?.map((employee : EmployeeOutput) => (
                        <div key={employee.id}>
                          <li>
                            <a
                              key={employee.id}
                              href={`/main/${department.companyId}/employees/info/${employee.id}`}
                              style={{ color: "black" }}
                            >
                              {employee.firstName} {employee.lastName}
                            </a>
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
                      onClick={() => handleDeleteDepartament(department.id!)}
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
              )
            )}
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
