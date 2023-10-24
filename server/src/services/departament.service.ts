import { prisma } from "../prisma";
import { Department } from "@prisma/client";

export class DepartamentService {
  static async getAllDepartaments() {
    try {
      const departments = await prisma.department.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          employees: true,
          company: {
            select: {
              name: true,
            },
          },
        },
      });
      return departments;
    } catch (e) {
      console.log(e);
    }
  }

  static async findFiveLargestDepartamentsOfCompany(id: any) {
    try {
      const departments = await prisma.department.findMany({
        where: {
          companyId: id,
        },
        include: {
          employees: true,
        },
        orderBy: {
          employees: {
            _count: "desc",
          },
        },
        take: 5,
      });
      return departments;
    } catch (error) {}
  }

  static async getAllDepartamentsOfCompany(id: any) {
    try {
      const departaments = await prisma.department.findMany({
        where: {
          companyId: id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          employees: true,
        },
      });
      return departaments;
    } catch (error) {}
  }

  static async deleteDepartament(id: any) {
    try {
      return await prisma.department.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("An error occurred while deleting company:", error);
      throw error;
    }
  }

  static async updateDepartament(id: any, dto: any) {
    try {
      const updateDepartament = await prisma.department.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
          updatedAt: new Date(),
        },
      });
      return updateDepartament;
    } catch (error) {
      console.error("An error occurred while updating departament:", error);
      throw error;
    }
  }

  static async createNewDepartament(input: any) {
    try {
      const newDepartament = await prisma.department.create({
        data: input,
      });
      return newDepartament;
    } catch (error) {
      console.error(
        "An error occurred while creating a new departament:",
        error
      );
      throw error;
    }
  }

  static async getInfoAboutDepartament(id: any) {
    try {
      const findedCompany = await prisma.department.findFirst({
        where: {
          id: id,
        },
        include: {
          employees: true,
        },
      });
      return findedCompany;
    } catch (error) {
      console.error(
        "An error occurred while finding info about  departament:",
        error
      );
      throw error;
    }
  }
}
