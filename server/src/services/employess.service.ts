import { prisma } from "../prisma";
import { Employee } from "@prisma/client";

export class EmployeeService {
  static async getAllEmployeesOfDepartament(id: number): Promise<Employee[]> {
    try {
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

  static async createEmployee(dto: any): Promise<Employee> {
    try {
      const newEmployee = await prisma.employee.create({
        data: {
          departmentId: dto.department_id,
          firstName: dto.first_name,
          lastName: dto.last_name,
          role: dto.id_role,
        },
      });
      return newEmployee;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateEmployee(id: any, dto: any): Promise<Employee> {
    try {
      const updateEmployee = await prisma.employee.update({
        where: {
          id: id,
        },
        data: {
          departmentId: dto.department_id,
          firstName: dto.first_name,
          lastName: dto.last_name,
          role: dto.id_role,
        },
      });
      return updateEmployee;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  static async deleteEmployee(id: any) {
    try {
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
  static async getEmployessByName(name: any) {
    try {
      const findedEmployees = await prisma.employee.findMany({
        where: {
          firstName: {
            contains: name,
          },
        },
      });
      return findedEmployees;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
