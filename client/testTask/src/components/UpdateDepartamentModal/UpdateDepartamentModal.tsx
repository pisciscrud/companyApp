import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DepartmnetOutput } from "../../api/types";
import { trpc } from "../../utils/trpcClient";

interface AddCompanyModalProps {
  showModal: boolean;
  handleClose: () => void;
  updateInfo: Required<DepartmnetOutput>;
}

const UPDATE_DEPARTMNET_FORM_SCHEMA = z.object({
  name: z
    .string()
    .min(2, { message: "Name of company is too short" })
    .max(20, "Name of company is too long"),
  description: z
    .string()
    .min(2, { message: "Description of company is too short" })
    .max(80, "Description of company is too long"),
});
type FormSchema = z.infer<typeof UPDATE_DEPARTMNET_FORM_SCHEMA>;

const UpdateDepartamentModal: React.FC<AddCompanyModalProps> = ({
  showModal,
  handleClose,
  updateInfo,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(UPDATE_DEPARTMNET_FORM_SCHEMA),
  });

  const [currentName, setCurrentName] = useState(updateInfo.name);
  const [currentDescription, setCurrentDescription] = useState(
    updateInfo.description
  );

  const mutationUpdateDepartment =
    trpc.departament.updateDepartamnet.useMutation();

  const onSubmit: SubmitHandler<FormSchema> = async (formData) => {
    try {
      const validationResult =
        UPDATE_DEPARTMNET_FORM_SCHEMA.safeParse(formData);

      if (validationResult.success) {
        await mutationUpdateDepartment.mutateAsync({
          body: {
            ...formData,
          },
          paramDepartament: {
            departmentId: updateInfo.id,
          },
        });
        handleClose();
      }
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>New name of department </Form.Label>
            <Form.Control
              type="text"
              placeholder="Input name of company"
              {...register("name")}
              value={currentName}
              onChange={(e) => setCurrentName(e.target.value)}
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>New description of department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Input description of company"
              value={currentDescription}
              {...register("description")}
              onChange={(e) => setCurrentDescription(e.target.value)}
              isInvalid={!!errors.description}
            />
            {errors.description && (
              <Form.Control.Feedback type="invalid">
                {errors.description.message}
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
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateDepartamentModal;
