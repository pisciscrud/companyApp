import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewCompany } from "../../api/companies.api";

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

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({
  showModal,
  handleClose,
}) => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormSchema> = async (formData) => {
    try {
      const validationResult = schema.safeParse(formData);
      console.log(validationResult);
      if (validationResult.success) {
        await addNewCompany(formData);
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
              isInvalid={!!errors.companyName}
            />
            {errors.companyName && (
              <Form.Control.Feedback type="invalid">
                {errors.companyName.message}
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
