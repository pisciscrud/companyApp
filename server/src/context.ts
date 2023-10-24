import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import {prisma} from './prisma'

interface InnerTRPCContext {
  prisma: typeof prisma;
}

export async function createInnerTRPCContext(opts?: any) :Promise<InnerTRPCContext>
{
    return {
      prisma,
      ...opts,
    };
  }
export const  createContext = async (opts?: CreateExpressContextOptions) : Promise<InnerTRPCContext & { req?: any }> => {

    const innerContext = await createInnerTRPCContext({
        req: opts?.req,
        
      });
    
      return {
        ...innerContext,
        req: opts?.req,
      };
 
}