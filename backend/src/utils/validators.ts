// src/utils/validators.ts
import { object, string, number, array, date, optional } from 'joi';

export const schemas = {
  // Authentication
  registerSchema: object({
    email: string().email().required(),
    password: string().min(8).required(),
    name: string().required(),
    phone: optional(string()),
  }),

  loginSchema: object({
    email: string().email().required(),
    password: string().required(),
  }),

  // Employee
  createEmployeeSchema: object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    phone: optional(string()),
    department: string().required(),
    designation: string().required(),
    joinDate: date().required(),
    salary: optional(number()),
  }),

  // Candidate
  createCandidateSchema: object({
    jobId: string().required(),
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    phone: string().required(),
    experience: optional(number()),
    skills: optional(array().items(string())),
  }),

  // Leave Request
  createLeaveSchema: object({
    leaveType: string().required(),
    startDate: date().required(),
    endDate: date().required(),
    reason: optional(string()),
  }),

  // Expense
  createExpenseSchema: object({
    category: string().required(),
    description: string().required(),
    amount: number().positive().required(),
    date: date().required(),
  }),
};

export const validate = (data: any, schema: any) => {
  const { error, value } = schema.validate(data, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const messages = error.details.map(d => d.message).join(', ');
    throw new Error(messages);
  }

  return value;
};
