import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  GetDepartmnetsOutput,
  EmployeeOutput,
  Position,
} from "../../api/types";
import { trpc } from "../../utils/trpcClient";

interface UpdateEmployeeModalProps {
  showModal: boolean;
  handleClose: () => void;
  employee: Required<EmployeeOutput>;
  departments: GetDepartmnetsOutput;
}

const UPDATE_EMPLOYEE_FORM_SCHEMA = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name is too short" })
    .max(20, "First name is too long"),
  lastName: z
    .string()
    .min(2, { message: "Last name is too short" })
    .max(20, "Last name is too long"),
  position: z.enum([Position.EMPLOYEE, Position.HEAD]),
  departmentId: z.string(),
});
type FormSchema = z.infer<typeof UPDATE_EMPLOYEE_FORM_SCHEMA>;

const UpdateEmployeeModal: React.FC<UpdateEmployeeModalProps> = ({
  showModal,
  handleClose,
  employee,
  departments,
}) => {
  const {
    register,
    handleSubmit,

    formState: { isSubmitting, errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(UPDATE_EMPLOYEE_FORM_SCHEMA),
  });

  const [currentFirstName, setCurrentFirstName] = useState(employee.firstName);
  const [currentLastName, setCurrentLastName] = useState(employee.lastName);
  const [currentPosition, setCurrentPosition] = useState(employee.position);
  const [currentDepartment, setCurrentDepartment] = useState<
    number | undefined
  >(employee.department?.id);
  const [error, setError] = useState("");
  const mutationUpdateEmployee = trpc.employee.updateEmployee.useMutation();

  const onSubmit: SubmitHandler<FormSchema> = async (formData) => {
    try {
      const validationResult = UPDATE_EMPLOYEE_FORM_SCHEMA.safeParse(formData);
      if (validationResult.success) {
        await mutationUpdateEmployee.mutateAsync({
          params: {
            employeeId: employee.id,
          },
          body: {
            ...formData,
            departmentId: +formData.departmentId,
          },
        });
        handleClose();
      }
    } catch (err: any) {
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
          <Form.Group controlId="departmentId">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              value={currentDepartment}
              {...register("departmentId")}
              onChange={(e) => setCurrentDepartment(+e.target.value)}
              isInvalid={!!errors.departmentId}
            >
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </Form.Control>
            {errors.departmentId && (
              <Form.Control.Feedback type="invalid">
                {errors.departmentId.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
          <Button variant="primary" type="submit">
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateEmployeeModal;
