import { Modal, Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpcClient";

interface AddCompanyModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const ADD_COMPANY_FORM_SCHEMA = z.object({
  name: z
    .string()
    .min(2, { message: "Name of company is too short" })
    .max(20, "Name of company is too long"),
  description: z
    .string()
    .min(2, { message: "Description of company is too short" })
    .max(80, "Description of company is too long"),
});
type FormSchema = z.infer<typeof ADD_COMPANY_FORM_SCHEMA>;

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({
  showModal,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FormSchema>({ resolver: zodResolver(ADD_COMPANY_FORM_SCHEMA) });

  const mutation = trpc.company.addCompany.useMutation();

  const onSubmit: SubmitHandler<FormSchema> = async (formData) => {
    try {
      const validationResult = ADD_COMPANY_FORM_SCHEMA.safeParse(formData);

      if (validationResult.success) {
        await mutation.mutateAsync(formData);
        hadleCloseModal();
      }
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  const hadleCloseModal = () => {
    resetField("name");
    resetField("description");
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={hadleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="name">
            <Form.Label>Name of new company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Input name of company"
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
            <Form.Label>Description of company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Input description of company"
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

export default AddCompanyModal;
