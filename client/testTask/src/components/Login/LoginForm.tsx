import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import styles from "./login.module.css";
import { useNavigate } from "react-router";
import { z } from "zod";
import { trpc } from "../../utils/trpcClient";

const LOGIN_FORM_SCHEMA = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormProps = z.infer<typeof LOGIN_FORM_SCHEMA>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginFormProps>();

  const [error, setError] = useState<{ message: string } | null>(null);
  const mutation = trpc.auth.signIn.useMutation();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormProps> = async (formData) => {
    try {
      const result = await mutation.mutateAsync(formData);
      if (result) {
        localStorage.setItem("token", result.jwt);
        navigate("/companies");
      }
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <>
      <Container className={styles.mycontainer}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              placeholder="email"
              {...register("email", {
                required: "Email is required",
              })}
              isInvalid={!!errors.email}
            />
            {errors.email && (
              <Form.Control.Feedback type="invalid">
                {errors.email.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              {...register("password", {
                required: "Password is required",
              })}
              isInvalid={!!errors.password}
            />
            {errors.password && (
              <Form.Control.Feedback type="invalid">
                {errors.password.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            Submit
          </Button>
          {error && <p style={{ color: "red" }}>{error.message}</p>}
        </Form>
      </Container>
    </>
  );
};

export default Login;
