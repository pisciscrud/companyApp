import { AuthController } from "../controllers";
import { baseProcedure, router } from "../trpc";
import { LOGIN_FORM_SCHEMA } from "../schema/auth.schema";


export const authRouter = router({
    signIn: baseProcedure.input(LOGIN_FORM_SCHEMA).mutation(({input})=>AuthController.signIn({input})),

})