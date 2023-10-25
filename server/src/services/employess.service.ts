import { TRPCError } from "@trpc/server";
import { prisma } from "../prisma";
import { Employee, Position } from "@prisma/client";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../dto/employee.dto";

export class EmployeeService {
  static async getAllEmployeesOfDepartament(id: number): Promise<Employee[]> {
    try {
      const department = await prisma.department.findUnique({
        where: { id: id },
      });

      if (!department)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `[EmployeeService getAllEmployeesOfDepartament] Department ID provided has not exists`,
        });
      return await prisma.employee.findMany({
        where: {
          departmentId: id,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getAll(): Promise<Employee[]> {
    try {
      return await prisma.employee.findMany();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async createEmployee(data: CreateEmployeeDTO): Promise<Employee> {
    try {
      const department = await prisma.department.findUnique({
        where: { id: data.departmentId },
      });

      if (!department)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `[EmployeeService addNewEmployee] Department ID provided has not exists`,
        });

      if (data.position === Position.HEAD) {
        const headOfDepartament = await prisma.employee.findFirst({
          where: { position: Position.HEAD, departmentId: data.departmentId },
        });

        if (headOfDepartament)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `[EmployeeService addNewEmployee] Head of department ID provided has already exists`,
          });
      }

      const newEmployee = await prisma.employee.create({
        data,
      });
      return newEmployee;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateEmployee(
    id: number,
    dto: UpdateEmployeeDTO
  ): Promise<Employee> {
    try {
      const findedEmployee = await prisma.employee.findFirst({
        where: {
          id: id,
        },
      });
      if (!findedEmployee)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `[EmployeeService updateEmployee] employee doesn't exist`,
        });

      const updateEmployee = await prisma.employee.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
        },
      });
      return updateEmployee;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteEmployee(id: number) {
    try {
      const findedEmployee = await prisma.employee.findFirst({
        where: {
          id: id,
        },
      });
      if (!findedEmployee)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `[EmployeeService deleteEmployee] employee doesn't exist`,
        });
      await prisma.employee.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async getEmployessByName(name: string) {
    try {
      const findedEmployees = await prisma.employee.findMany({
        where: {
          firstName: {
            contains: name,
            mode: "insensitive",
          },
        },
      });
      return findedEmployees;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getInfoAboutEmployee(id: number) {
    try {
      const findedEmployee = await prisma.employee.findFirst({
        where: {
          id: id,
        },
      });
      if (!findedEmployee)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `[EmployeeService getInfoAboutEmployee] employee doesn't exist`,
        });
      const findedEmployees = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      });
      return findedEmployees;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
