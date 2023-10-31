import { prisma } from "../prisma";
import { Company } from "@prisma/client";
import { CreateCompanyDTO, UpdateCompanyDTO } from "../dto/company.dto";
import { TRPCError } from "@trpc/server";

export class CompanyService {
  static async getAllCompanies(): Promise<Company[]> {
    const companies = await prisma.company.findMany();

    return companies;
  }

  static async addNewCompany(dto: CreateCompanyDTO): Promise<Company> {
    const existedCompany = await prisma.company.findFirst({
      where: {
        name: dto.name,
      },
    });
    if (existedCompany) {
      if (existedCompany)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `[CompanyService addNewCompany] Company with this name exist`,
        });
    }
    const newCompany = await prisma.company.create({
      data: dto,
    });
    return newCompany;
  }

  static async updateCompany(
    id: number,
    dto: UpdateCompanyDTO
  ): Promise<Company> {
    const findedCompany = await prisma.company.findFirst({
      where: {
        id: id,
      },
    });
    if (!findedCompany) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[CompanyService updateCompany] Provided company hasn't exist`,
      });
    }
    return await prisma.company.update({
      where: {
        id: id,
      },
      data: dto,
    });
  }
  static async deleteCompany(id: any): Promise<void> {
    const findedCompany = await prisma.company.findFirst({
      where: {
        id: id,
      },
    });
    if (!findedCompany) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[CompanyService deleteCompany] Provided company hasn't exist`,
      });
    }
    await prisma.company.delete({
      where: {
        id: id,
      },
    });
  }
  static async getInfoAboutCompany(id: number) {
    const foundCompany = await prisma.company.findFirst({
      where: {
        id: id,
      },
    });
    if (!foundCompany) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: `[CompanyService getInfoAboutCompany] Provided company hasn't exist`,
      });
    }
    const company = await prisma.company.findFirst({
      where: {
        id: id,
      },
      include: {
        departments: {
          include: {
            employees: true,
          },
        },
      },
    });
    return company;
  }
}
