import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewEmployee } from "../../api/employees.api";
import { useParams } from "react-router-dom";

// ENUM для выбора должности
enum Position {
  HEAD = "HEAD",
  EMPLOYEE = "EMPLOYEE",
}

interface AddEmployeeModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name is too short" })
    .max(20, "First name is too long")
    .nonempty("First name is required"),
  lastName: z
    .string()
    .min(2, { message: "Last name is too short" })
    .max(20, "Last name is too long")
    .nonempty("Last name is required"),
  position: z.enum(Position),
  department: z.string().nonempty("Department is required"),
});
type FormSchema = z.infer<typeof schema>;

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  showModal,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentPosition, setCurrentPosition] = useState(Position.HEAD);
  const [currentDepartment, setCurrentDepartment] = useState("");
  const { id } = useParams<{ id: string }>();
  const onSubmit: SubmitHandler<FormSchema> = async (formData) => {
    try {
      const validationResult = schema.safeParse(formData);
      console.log(validationResult);
      if (validationResult.success) {
        await addNewEmployee(formData);
        handleClose();
      }
    } catch (err) {
      // Обработка ошибок, если запрос не удался
      console.error("Request error:", err);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              {...register("firstName")}
              value={currentFirstName}
              onChange={(e) => setCurrentFirstName(e.target.value)}
              isInvalid={!!errors.firstName}
            />
            {errors.firstName && (
              <Form.Control.Feedback type="invalid">
                {errors.firstName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              {...register("lastName")}
              value={currentLastName}
              onChange={(e) => setCurrentLastName(e.target.value)}
              isInvalid={!!errors.lastName}
            />
            {errors.lastName && (
              <Form.Control.Feedback type="invalid">
                {errors.lastName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="position">
            <Form.Label>Position</Form.Label>
            <Form.Control
              as="select"
              {...register("position")}
              value={currentPosition}
              onChange={(e) => setCurrentPosition(e.target.value as Position)}
              isInvalid={!!errors.position}
            >
              <option value={Position.HEAD}>Head</option>
              <option value={Position.EMPLOYEE}>Employee</option>
            </Form.Control>
            {errors.position && (
              <Form.Control.Feedback type="invalid">
                {errors.position.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="department">
            <Form.Label>Department</Form.Label>
            {/* <Form.Control
              type="text"
              placeholder="Enter department"
              {...register("department")}
             setCurrentDepartment
              onChange={(e) => setCurrentDepartment(e.target.value)}
             setCurrentDepartment
            />
            {errors.department && (
              <Form.Control.Feedback type="invalid">
                {errors.department.message}
              </Form.Control.Feedback>
            )} */}
            <Form.Control
              as="select"
              {...register("departament")}
              setCurrentDepartment
              onChange={(e) => setCurrentDepartment(e.target.value)}
              isInvalid={!!errors.departament}
            >
              <option value={Position.HEAD}>Head</option>
              <option value={Position.EMPLOYEE}>Employee</option>
            </Form.Control>
            {errors.position && (
              <Form.Control.Feedback type="invalid">
                {errors.position.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ margin: "10px", backgroundColor: "rgb(19, 38, 98)" }}
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              Add
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeModal;
