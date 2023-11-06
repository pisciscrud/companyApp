import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Button, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Position } from "../../api/types";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpcClient";

const ADD_EMPLOYEE_FORM_SCHEMA = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name is too short" })
    .max(20, "First name is too long"),
  lastName: z
    .string()
    .min(2, { message: "Last name is too short" })
    .max(20, "Last name is too long"),
  position: z.enum([Position.EMPLOYEE, Position.HEAD]),
});

type AddEmployeeFormValues = z.infer<typeof ADD_EMPLOYEE_FORM_SCHEMA>;

interface AddEmployeeModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const AddEmployeeToDepartment: React.FC<AddEmployeeModalProps> = ({
  showModal,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddEmployeeFormValues>({ resolver: zodResolver(ADD_EMPLOYEE_FORM_SCHEMA) });

  const { departmentId } = useParams<{ departmentId: string }>();

  const [currentFirstName, setCurrentFirstName] = useState("");
  const [currentLastName, setCurrentLastName] = useState("");
  const [currentPosition, setCurrentPosition] = useState(Position.HEAD);
  const [error, setError] = useState<string | null>(null);
  const mutationAddEmployeeToDepart = trpc.employee.addEmployee.useMutation();


  const onSubmit: SubmitHandler<AddEmployeeFormValues> = async (formData) => {
    try {
      const validationResult = ADD_EMPLOYEE_FORM_SCHEMA.safeParse(formData);
      if (!departmentId) return;

      if (validationResult.success) {
        await mutationAddEmployeeToDepart.mutateAsync({
          ...formData,
          departmentId: +departmentId,
        });
        handleModalClose();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  const resetForm = () => {
    reset({});
    setCurrentFirstName("");
    setCurrentLastName("");
    setCurrentPosition(Position.HEAD);
    setError("");
  };

  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
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

          <div style={{ textAlign: "center" }}>
            <Button
              style={{ margin: "10px", backgroundColor: "rgb(19, 38, 98)" }}
              type="submit"
      
            >
              Add
            </Button>
          </div>
          <div>{error && <p style={{ color: "red" }}>{error}</p>}</div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeToDepartment;
