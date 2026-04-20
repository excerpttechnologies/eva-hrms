// src/services/candidateService.ts
import { prisma } from '@config/database';
import { AppError } from '@middleware/errorHandler';
import { Prisma } from '@prisma/client';

export const candidateService = {
  async createCandidate(data: Prisma.CandidateCreateInput) {
    try {
      const candidate = await prisma.candidate.create({
        data,
        include: {
          job: true,
          interviewScheduled: true,
        },
      });

      return candidate;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new AppError(409, 'Candidate already applied for this job');
      }
      throw error;
    }
  },

  async getCandidates(filters?: {
    jobId?: string;
    stage?: string;
    page?: number;
    pageSize?: number;
  }) {
    const page = filters?.page || 1;
    const pageSize = filters?.pageSize || 10;
    const skip = (page - 1) * pageSize;

    const where: Prisma.CandidateWhereInput = {};

    if (filters?.jobId) {
      where.jobId = filters.jobId;
    }

    if (filters?.stage) {
      where.stage = filters.stage as any;
    }

    const [candidates, total] = await Promise.all([
      prisma.candidate.findMany({
        where,
        skip,
        take: pageSize,
        include: {
          job: true,
          interviewScheduled: true,
        },
        orderBy: { appliedDate: 'desc' },
      }),
      prisma.candidate.count({ where }),
    ]);

    return {
      data: candidates,
      total,
      page,
      pageSize,
      pages: Math.ceil(total / pageSize),
    };
  },

  async getCandidateById(id: string) {
    const candidate = await prisma.candidate.findUnique({
      where: { id },
      include: {
        job: true,
        interviewScheduled: true,
        offers: true,
      },
    });

    if (!candidate) {
      throw new AppError(404, 'Candidate not found');
    }

    return candidate;
  },

  async updateCandidateStage(id: string, stage: string) {
    const candidate = await prisma.candidate.update({
      where: { id },
      data: { stage: stage as any },
      include: { job: true },
    });

    return candidate;
  },

  async updateMatchScore(id: string, score: number, analysis: string) {
    const candidate = await prisma.candidate.update({
      where: { id },
      data: {
        matchScore: score,
        aiAnalysis: analysis,
      },
    });

    return candidate;
  },

  async getRecruitmentStats() {
    const candidates = await prisma.candidate.findMany();

    const stats = {
      total: candidates.length,
      byStage: {} as Record<string, number>,
      avgScore: 0,
    };

    candidates.forEach(c => {
      stats.byStage[c.stage] = (stats.byStage[c.stage] || 0) + 1;
    });

    const scoreSum = candidates.reduce((sum, c) => sum + (c.matchScore || 0), 0);
    stats.avgScore = Math.round(scoreSum / candidates.length) || 0;

    return stats;
  },
};
