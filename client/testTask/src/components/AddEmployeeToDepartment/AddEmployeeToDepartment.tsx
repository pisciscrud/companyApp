import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { addNewEmployee } from "../../api/employees.api";
import { useParams } from "react-router-dom";
import { Position } from "../../shared/interfaces/employee";

interface AddEmployeeModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const AddEmployeeToDepartment: React.FC<AddEmployeeModalProps> = ({
  showModal,
  handleClose,
}) => {
  const { idDepartment } = useParams<{ idDepartment: string }>();

  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentPosition, setCurrentPosition] = useState(Position.HEAD);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    try {
      const formData = {
        firstName: currentFirstName,
        lastName: currentLastName,
        position: currentPosition,
        department: idDepartment,
      };

      await addNewEmployee(formData);
      setCurrentFirstName("");
      setCurrentLastName("");
      setCurrentPosition(Position.HEAD);
      setError("");
      handleClose();
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          {/* First Name */}
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={currentFirstName}
              onChange={(e) => setCurrentFirstName(e.target.value)}
            />
          </Form.Group>

          {/* Last Name */}
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={currentLastName}
              onChange={(e) => setCurrentLastName(e.target.value)}
            />
          </Form.Group>

          {/* Position */}
          <Form.Group controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Control
              as="select"
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value as Position)}
            >
              <option value={Position.HEAD}>Head</option>
              <option value={Position.EMPLOYEE}>Employee</option>
            </Form.Control>
          </Form.Group>
          {error && <p>{error}</p>}
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeToDepartment;
