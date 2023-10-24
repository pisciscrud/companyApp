import { prisma } from "../prisma";
import { Company } from "@prisma/client";
import { CreateCompanyDTO, UpdateCompanyDTO } from "../dto/company.dto";
export class CompanyService {
  static async getAllCompanies(): Promise<Company[]> {
    try {
      const companies = await prisma.company.findMany();
      console.log(companies);
      return companies;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async addNewCompany(dto: CreateCompanyDTO): Promise<Company> {
    try {
      const newCompany = await prisma.company.create({
        data: dto,
      });
      return newCompany;
    } catch (error) {
      console.error("An error occurred while creating a new company:", error);
      throw error;
    }
  }

  static async updateCompany(
    id: number,
    dto: UpdateCompanyDTO
  ): Promise<Company> {
    try {
      return await prisma.company.update({
        where: {
          id: id,
        },
        data: dto,
      });
    } catch (error) {
      console.error("An error occurred while updating company:", error);
      throw error;
    }
  }
  static async deleteCompany(id: any): Promise<void> {
    try {
      await prisma.company.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error("An error occurred while deleting company:", error);
      throw error;
    }
  }
  static async getInfoAboutCompany(id: any) {
    try {
      const company = await prisma.company.findFirst({
        where: {
          id: id,
        },
        include: {
          departments: true,
        },
      });
    } catch (error) {
      console.error("An error occurred while find info about  company:", error);
      throw error;
    }
  }
}
