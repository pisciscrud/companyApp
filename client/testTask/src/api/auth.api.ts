import { AuthUserDTO } from "../shared/User";
import { trpc } from "../utils/trpcClient";

export const authHeader = () => {
  const tokenStr = localStorage.getItem("token");
  const token = tokenStr ? JSON.parse(tokenStr) : null;

  if (token) {
    return `Bearer ${token}`;
  } else {
    return {};
  }
};

export const loginUser = async (input: AuthUserDTO) => {
  try {
    const response = await trpc.auth.signIn.mutate({
      email: input.email,
      password: input.password,
    });

    localStorage.setItem("token", (response.data.data as { jwt: string }).jwt);
  } catch (e: any) {
    throw new Error(`Failed to add new employee: ${e.message}`);
  }
};
