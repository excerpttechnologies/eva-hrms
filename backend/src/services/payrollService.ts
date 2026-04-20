// src/services/payrollService.ts
import { prisma } from '@config/database';
import { AppError } from '@middleware/errorHandler';
import { Prisma } from '@prisma/client';

export const payrollService = {
  async createPayrollRecord(data: Prisma.PayrollRecordCreateInput) {
    try {
      // Check for existing record
      const existing = await prisma.payrollRecord.findUnique({
        where: {
          employeeId_month_year: {
            employeeId: data.employeeId as string,
            month: data.month as string,
            year: data.year as number,
          },
        },
      });

      if (existing) {
        throw new AppError(409, 'Payroll record already exists for this month');
      }

      const record = await prisma.payrollRecord.create({
        data,
      });

      return record;
    } catch (error) {
      throw error;
    }
  },

  async calculatePayroll(employeeId: string, month: string, year: number) {
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      throw new AppError(404, 'Employee not found');
    }

    // Basic calculation (replace with real calculation logic)
    const basicSalary = employee.salary || 0;
    const hra = basicSalary * 0.4; // 40% of basic
    const dearness = basicSalary * 0.15; // 15% of basic

    const totalEarnings = basicSalary + hra + dearness;

    // Deductions
    const incomeTax = totalEarnings * 0.1; // 10% (simplified)
    const employeePF = basicSalary * 0.12; // 12% PF
    const totalDeductions = incomeTax + employeePF;

    const netSalary = totalEarnings - totalDeductions;

    return {
      basicSalary,
      hra,
      dearness,
      totalEarnings,
      incomeTax,
      employeePF,
      totalDeductions,
      netSalary,
    };
  },

  async getPayrollRecords(filters?: {
    employeeId?: string;
    status?: string;
    page?: number;
    pageSize?: number;
  }) {
    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const where: Prisma.PayrollRecordWhereInput = {};

    if (filters?.employeeId) {
      where.employeeId = filters.employeeId;
    }

    if (filters?.status) {
      where.status = filters.status as any;
    }

    const [records, total] = await Promise.all([
      prisma.payrollRecord.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { month: 'desc' },
      }),
      prisma.payrollRecord.count({ where }),
    ]);

    return {
      data: records,
      total,
      page,
      pageSize,
      pages: Math.ceil(total / pageSize),
    };
  },

  async approvePayroll(recordId: string) {
    const record = await prisma.payrollRecord.update({
      where: { id: recordId },
      data: { status: 'PAID' as any, paidDate: new Date() },
    });

    return record;
  },
};
