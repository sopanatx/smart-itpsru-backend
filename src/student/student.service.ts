import { Injectable } from '@nestjs/common';
import { studentActivity } from '../service/studentActivity.service';
import { studentGrade } from 'src/service/studentGrade.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async getActivity(studentId: string): Promise<any> {
    return studentActivity(studentId);
  }

  async getGrade(studentId: string): Promise<any> {
    return studentGrade(studentId);
  }
  async getCalendar(): Promise<any> {
    return await this.prisma.activityCalendar.findMany({
      orderBy: [
        {
          activityStartDate: 'asc',
        },
      ],
    });
  }
  
}
