import { trpc } from "../utils/trpcClient";


export const  authHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return `Bearer ${token}`;
    } else {
        return {};
    }
}
export const loginUser =  async (input) =>
{
    try {
    console.log(input.email,input.password)
 const response = await trpc.auth.signIn.mutate({email: input.email, password: input.password})

  localStorage.setItem("token", JSON.stringify(response.jwt));
    }
    catch (e)
    {
        console.log( e)
    }
}