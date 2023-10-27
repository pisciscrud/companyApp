import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateDepartament } from "../../api/departaments.api";

interface AddCompanyModalProps {
  showModal: boolean;
  handleClose: () => void;
}

const schema = z.object({
  name: z
    .string()
    .min(2, { message: "Name of company is too short" })
    .max(20, "Name of company is too long")
    .nonempty("Name is required"),
  description: z
    .string()
    .min(2, { message: "Description of company is too short" })
    .max(80, "Description of company is too long")
    .nonempty("Description is required"),
});
type FormSchema = z.infer<typeof schema>;

const UpdateDepartamentModal: React.FC<AddCompanyModalProps> = ({
  showModal,
  handleClose,
  name,
  description,
}) => {
  console.log(name);
  console.log(description);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const [currentName, setCurrentName] = useState(name);
  const [currentDescription, setCurrentDescription] = useState(description);
  const onSubmit: SubmitHandler<FormSchema> = async (formData) => {
    try {
      const validationResult = schema.safeParse(formData);
      console.log(validationResult);
      if (validationResult.success) {
        await updateDepartament(formData);
        handleClose();
      }
    } catch (err) {
      // Обработка ошибок, если запрос не удался
      console.error("Request error:", err);
    }
  };

  //   useEffect(() => {
  //     setFocus("name");
  //   }, []);

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
              isInvalid={!!errors.companyName}
            />
            {errors.companyName && (
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
              onChange={(e) => setCurrentDescription(e.target.value)}
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

export default UpdateDepartamentModal;
