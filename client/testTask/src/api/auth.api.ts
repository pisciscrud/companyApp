import { trpc, RouterInputs } from "../utils/trpcClient";

export const authHeader = () => {
  const tokenStr = localStorage.getItem("token");
  const token = tokenStr ? JSON.parse(tokenStr) : null;

  if (token) {
    return `Bearer ${token}`;
  } else {
    return {};
  }
};
type AuthUserOptions = RouterInputs["auth"]["signIn"];

export const loginUser = async (input: AuthUserOptions) => {
  try {
    const response = await trpc.auth.signIn.mutate({
      ...input,
    });

    localStorage.setItem("token", (response.data.data as { jwt: string }).jwt);
  } catch (e: any) {
    throw new Error(`Failed to add new employee: ${e.message}`);
  }
};
