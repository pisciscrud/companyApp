import { CreateExpressContextOptions } from '@trpc/server/adapters/express'
import {prisma} from './prisma'

export async function createInnerTRPCContext(opts?: any) {
    return {
      prisma,
      companies: prisma.companies,
      departments: prisma.departments,
      employees: prisma.employees,
      roles: prisma.roles,
      ...opts,
    };
  }
export const  createContext = async (opts?: CreateExpressContextOptions) => {

    const innerContext = await createInnerTRPCContext({
        req: opts?.req,
        
      });
    
      return {
        ...innerContext,
        req: opts?.req,
      };
 
}