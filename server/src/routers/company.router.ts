import { z } from 'zod';
import { baseProcedure, router } from '../trpc';

export const companyRouter = router ({
    all: baseProcedure.query(({ctx})=>
    {
        try {
        return ctx.companies.findMany();
        }
        catch (e)
        {
            console.log(e);
        }
    })
})