import { TRPCError } from '@trpc/server';
import { EmployeeService } from '../services/employess.service';
import { CreateEmployeeInput, ParamInputName, ParamsInput,UpdateEmployeeInput } from '../schema/employee.schema'

export class EmployeeController
{
    static async getAll()
    {
        try{
            const result = await EmployeeService.getAll();
            return {
                status: "success",
                data: {
                  result,
                },
              };
            } catch (e: any) {
              console.log(e);
              throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `[EmployeeController getAll] ${e?.message || e?.stack}`,
              });
            }
    }

    static async addNewEmployee({input}:{input: CreateEmployeeInput})
    {
        try 
        {
            const result = await EmployeeService.createEmployee(input);
            return {
                status: "success",
                data: {
                  result,
                },
              };
        }
        catch (e: any) {
            console.log(e);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `[EmployeeController addNewEmployee] ${e?.message || e?.stack}`,
            });
          }
    }

    static async updateEmployee({
        paramsInput,
        input,
      }: {  paramsInput:ParamsInput, input: UpdateEmployeeInput})
      {
        try {
        const result = await EmployeeService.updateEmployee(paramsInput,input);
        return {
            status: "success",
            data: {
              result,
            },
          };
        }
        catch (e: any) {
            console.log(e);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `[EmployeeController updateEmployee] ${e?.message || e?.stack}`,
            });
          }
      }

      static async deleteEmployee({paramsInput}: { paramsInput: ParamsInput })
      {
      try
      {
        await EmployeeService.deleteEmployee(paramsInput);
        return {
          status: "success",
          data: null,
        };
      }
      catch (e: any) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `[EmployeeController deleteEmployee] ${e?.message || e?.stack}`,
        });
      }
      }

      static async findEmployeesByName({paramInput}:{paramInput: ParamInputName})
      {
        try
        {
            const result = await EmployeeService.getEmployessByName(paramInput);
            return {
                status: "success",
                data: {
                    
                  result,
                },
              };

        }
        catch (e: any) {
            console.log(e);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `[EmployeeController findEmployeesByName] ${e?.message || e?.stack}`,
            });
          }
      }
}