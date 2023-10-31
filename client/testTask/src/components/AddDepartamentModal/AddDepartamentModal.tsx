import { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewDepartment } from "../../api/departaments.api";

interface AddDepartmentModalProps {
  showModal: boolean;
  handleClose: () => void;
  id?: string;
}

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Name of departament is min 2 symbols" })
    .max(20, "Name of company is max 20 symbols"),
  description: z
    .string()
    .min(2, { message: "Description of departament is min 2 symbols" })
    .max(80, "Description of departament is max 80 symbols"),
});
type FormSchema = z.infer<typeof schema>;

const AddDepartamentModal: React.FC<AddDepartmentModalProps> = ({
  showModal,
  handleClose,
  id,
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    resetField,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormSchema> = async (formData) => {
    try {
      const validationResult = schema.safeParse(formData);

      if (validationResult.success) {
        if (!id) return;
        await addNewDepartment(+id, formData);
        hanleCloseModal();
      }
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  useEffect(() => {
    setFocus("name");
  }, []);

  const hanleCloseModal = () => {
    resetField("name");
    resetField("description");
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={hanleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>Name of new department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Input name of department"
              {...register("name")}
              isInvalid={!!errors.name}
            />
            {errors.name && (
              <Form.Control.Feedback type="invalid">
                {errors.name.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description of department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Input description of department"
              {...register("description")}
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

export default AddDepartamentModal;
