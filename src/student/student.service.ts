import { Injectable } from '@nestjs/common';
import { studentActivity } from '../service/studentActivity.service';
import { studentGrade } from 'src/service/studentGrade.service';
import { PrismaService } from 'src/prisma/prisma.service';
import getClass from '../service/getClass.service';
import axios from 'axios';
@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async getActivity(studentId: string): Promise<any> {
    return studentActivity(studentId);
  }

  async getGrade(studentId: string): Promise<any> {
    return studentGrade(studentId);
  }

  async getClass(StudentId: string): Promise<any> {
    const getStudent = await this.prisma.account.findUnique({
      where: {
        studentId: `${StudentId}`,
      },
      select: {
        studentId: true,
        AccountInfo: {
          select: {
            admissionYear: true,
            educateGroup: true,
          },
        },
      },
    });
    // console.log(getStudent);
    const { admissionYear, educateGroup } = getStudent.AccountInfo;
    // const term = semester.substr(0, 1);
    // const year = semester.substr(2, 6);
    const term = 1;
    const year = 2563;
    const classID = `TST1_${term}${year}_${admissionYear}132m1170${educateGroup}`;

    const getClassData = await getClass(classID);
    console.log({ term, year, educateGroup, admissionYear, classID });
    return getClassData;
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
