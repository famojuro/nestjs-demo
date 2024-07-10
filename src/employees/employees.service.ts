import { Injectable, NotFoundException } from "@nestjs/common";

import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService ) {
  }
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.databaseService.employee.findMany({
        where: {
          role,
        },
      });
    }

    return this.databaseService.employee.findMany();
  }

  async findOne(id: number) {
    const employee = this.databaseService.employee.findUnique({
      where: {
        id,
      },
    });
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return this.databaseService.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.employee.delete({
      where: {
        id,
      },
    });
  }
}
