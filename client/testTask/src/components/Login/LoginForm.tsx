// Login.tsx

import { SubmitHandler, useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { loginUser } from "../../api/auth.api";
import styles from "./login.module.css";
import { useNavigate } from "react-router";

interface LoginFormProps {
  email: string;
  password: string;
}

 const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormProps>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<LoginFormProps> = async (
    formData: LoginFormProps
  ) => {
    try {
      await loginUser(formData);
      navigate("/companies");
    } catch (err) {
      console.error("Request error:", err);
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
            <Form.Control placeholder="email" {...register("email")} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              {...register("password")}
            />
          </Form.Group>
          <Button
            type="submit"
            className={styles.button}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Login;
