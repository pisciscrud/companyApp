import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEmployee } from "../../api/employees.api";
import { Employee } from "../../shared/interfaces/employee";
import { Department } from "../../shared/interfaces/department";

enum Position {
  HEAD = "HEAD",
  EMPLOYEE = "EMPLOYEE",
}

interface UpdateEmployeeModalProps {
  showModal: boolean;
  handleClose: () => void;
  employee: Employee;
  departments: Department[];
}

const schema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name is too short" })
    .max(20, "First name is too long"),
  lastName: z
    .string()
    .min(2, { message: "Last name is too short" })
    .max(20, "Last name is too long"),
  position: z.enum([Position.EMPLOYEE, Position.HEAD]),
  department: z.string().nonempty("Department is required"),
});
type FormSchema = z.infer<typeof schema>;

const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
  showModal,
  handleClose,
  employee,
  departments,
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const [currentFirstName, setCurrentFirstName] = useState(employee.firstName);
  const [currentLastName, setCurrentLastName] = useState(employee.lastName);
  const [currentPosition, setCurrentPosition] = useState(employee.position);
  const [currentDepartment, setCurrentDepartment] = useState(
    employee.departmentId
  );
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<FormSchema> = async (formData) => {
    try {
      const validationResult = schema.safeParse(formData);
      if (validationResult.success) {
        await updateEmployee(employee.id, formData);
        handleClose();
      }
    } catch (err : any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Employee</Modal.Title>
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
            <Form.Control
              as="select"
              value={currentDepartment}
              {...register("department")}
              onChange={(e) => setCurrentDepartment(e.target.value)}
              isInvalid={!!errors.department}
            >
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </Form.Control>
            {errors.department && (
              <Form.Control.Feedback type="invalid">
                {errors.department.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button
            variant="primary"
            type="submit"
            // disabled={!isDirty || isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateEmployeeModal;
