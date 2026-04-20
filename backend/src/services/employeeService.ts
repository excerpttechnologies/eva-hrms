// src/services/employeeService.ts
import { prisma } from '@config/database';
import { AppError } from '@middleware/errorHandler';
import { Prisma } from '@prisma/client';

export const employeeService = {
  async createEmployee(data: Prisma.EmployeeCreateInput) {
    try {
      const employee = await prisma.employee.create({
        data,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
              role: true,
            },
          },
        },
      });

      return employee;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new AppError(409, 'Employee with this email already exists');
      }
      throw error;
    }
  },

  async getEmployees(filters?: {
    department?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }) {
    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const where: Prisma.EmployeeWhereInput = {};

    if (filters?.department) {
      where.department = filters.department;
    }

    if (filters?.status) {
      where.status = filters.status as any;
    }

    const [employees, total] = await Promise.all([
      prisma.employee.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          user: {
            select: { id: true, email: true, name: true, role: true },
          },
        },
        orderBy: { joinDate: 'desc' },
      }),
      prisma.employee.count({ where }),
    ]);

    return {
      data: employees,
      total,
      page,
      pageSize,
      pages: Math.ceil(total / pageSize),
    };
  },

  async getEmployeeById(id: string) {
    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, email: true, name: true, role: true },
        },
        attendanceRecords: {
          take: 30,
          orderBy: { date: 'desc' },
        },
        leaveRequests: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        payrollRecords: {
          take: 12,
          orderBy: { month: 'desc' },
        },
      },
    });

    if (!employee) {
      throw new AppError(404, 'Employee not found');
    }

    return employee;
  },

  async updateEmployee(id: string, data: Prisma.EmployeeUpdateInput) {
    try {
      const employee = await prisma.employee.update({
        where: { id },
        data,
        include: {
          user: {
            select: { id: true, email: true, name: true, role: true },
          },
        },
      });

      return employee;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError(404, 'Employee not found');
      }
      throw error;
    }
  },

  async deleteEmployee(id: string) {
    try {
      await prisma.employee.delete({
        where: { id },
      });

      return { message: 'Employee deleted successfully' };
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new AppError(404, 'Employee not found');
      }
      throw error;
    }
  },

  async getEmployeeStats() {
    const [total, active, onLeave, inactive] = await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({ where: { status: 'ACTIVE' } }),
      prisma.employee.count({ where: { status: 'ON_LEAVE' } }),
      prisma.employee.count({ where: { status: 'INACTIVE' } }),
    ]);

    return {
      total,
      active,
      onLeave,
      inactive,
    };
  },
};
