import { TRPCError } from "@trpc/server";
import { prisma } from "../prisma";
import { Employee, Position } from "@prisma/client";
import { CreateEmployeeDTO, UpdateEmployeeDTO } from "../dto/employee.dto";

export class EmployeeService {
  static async getAllEmployeesOfDepartament(id: number): Promise<Employee[]> {
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
  }

  static async getAll(): Promise<Employee[]> {
    return await prisma.employee.findMany();
  }

  static async createEmployee(data: CreateEmployeeDTO): Promise<Employee> {
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
  }

  static async updateEmployee(
    id: number,
    dto: UpdateEmployeeDTO
  ): Promise<Employee> {
    const foundEmployee = await prisma.employee.findFirst({
      where: {
        id: id,
      },
    });
    if (!foundEmployee)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[EmployeeService updateEmployee] employee doesn't exist`,
      });
    const department = await prisma.department.findUnique({
      where: { id: dto.departmentId },
    });

    if (!department)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[EmployeeService addNewEmployee] Department ID provided has not exists`,
      });

    if (dto.position === Position.HEAD) {
      const headOfDepartament = await prisma.employee.findFirst({
        where: { position: Position.HEAD, departmentId: dto.departmentId },
      });

      if (headOfDepartament)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `[EmployeeService addNewEmployee] Head of department ID provided has already exists`,
        });
    }
    const updateEmployee = await prisma.employee.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    return updateEmployee;
  }

  static async deleteEmployee(id: number) {
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
  }
  static async getEmployessByName(name: string) {
    const findedEmployees = await prisma.employee.findMany({
      where: {
        firstName: {
          contains: name,
          mode: "insensitive",
        },
      },
      include: {
        department: true,
      },
    });
    return findedEmployees;
  }

  static async getInfoAboutEmployee(id: number) {
    const foundEmployee = await prisma.employee.findFirst({
      where: {
        id: id,
      },
    });
    if (!foundEmployee)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[EmployeeService getInfoAboutEmployee] employee doesn't exist`,
      });
    const foundEmployees = await prisma.employee.findUnique({
      where: {
        id: id,
      },
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return foundEmployees;
  }

  static async getEmployeesOfCompany(id: number) {
    const employees = await prisma.employee.findMany({
      where: {
        department: {
          companyId: id,
        },
      },
      include: {
        department: true,
      },
    });
    return employees;
  }

  static async getFiveNewestEmployeesOfCompany(id: number) {
    const employees = await prisma.employee.findMany({
      where: {
        department: {
          companyId: id,
        },
      },
      include: {
        department: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });
    return employees;
  }
}
