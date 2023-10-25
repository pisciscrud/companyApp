import { AuthController } from "../controllers";
import { baseProcedure, router } from "../trpc";
import { SignInSchema } from "../schema/auth.schema";


export const authRouter = router({
    signIn: baseProcedure.input(SignInSchema).mutation(({input})=>AuthController.signIn({input})),

})