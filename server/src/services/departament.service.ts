import { prisma } from "../prisma";
import { Department } from "@prisma/client";
import {
  CreateDepartamentDTO,
  UpdateDepartamentDTO,
} from "../dto/departament.dto";
import { TRPCError } from "@trpc/server";

export class DepartamentService {
  static async getAllDepartaments() {
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
  }

  static async findFiveLargestDepartamentsOfCompany(id: number) {
    const findedCompany = await prisma.company.findFirst({
      where: {
        id: id,
      },
    });
    if (!findedCompany) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[DepartamentService findFiveLargestDepartamentsOfCompany] Provided departament han't exist`,
      });
    }
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
  }

  static async getAllDepartamentsOfCompany(id: number) {
    const departaments = await prisma.department.findMany({
      where: {
        companyId: id,
      },
      select: {
        id: true,
        name: true,
        description: true,
        employees: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return departaments;
  }

  static async deleteDepartament(id: number) {
    const foundDepartament = await prisma.department.findFirst({
      where: {
        id: id,
      },
    });
    if (!foundDepartament) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[DepartamentService deleteDepartament] Provided departament han't exist`,
      });
    }
    return await prisma.department.delete({
      where: {
        id: id,
      },
    });
  }

  static async updateDepartament(id: number, dto: UpdateDepartamentDTO) {
    console.log(id,dto)
    const foundDepartament = await prisma.department.findFirst({
      where: {
        id: id,
      },
    });
    if (!foundDepartament) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[DepartamentService updateDepartament] Provided departament han't exist`,
      });
    }
    const updateDepartament = await prisma.department.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
      },
    });
    console.log("updated", updateDepartament);
    return updateDepartament;
  }

  static async createNewDepartament(input: CreateDepartamentDTO) {
    const newDepartament = await prisma.department.create({
      data: input,
    });
    return newDepartament;
  }

  static async getInfoAboutDepartament(id: number) {
    const foundDepartament = await prisma.department.findFirst({
      where: {
        id: id,
      },
    });
    if (!foundDepartament) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[DepartamentService getInfoAboutDepartament] Provided departament han't exist`,
      });
    }
    const foundCompany = await prisma.department.findFirst({
      where: {
        id: id,
      },
      include: {
        employees: true,
      },
    });
    return foundCompany;
  }
}
