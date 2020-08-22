import { Injectable } from '@nestjs/common';
import { studentActivity } from '../service/studentActivity.service';
import { studentGrade } from 'src/service/studentGrade.service';
@Injectable()
export class StudentService {
  async getActivity(studentId: string): Promise<any> {
    return studentActivity(studentId);
  }

  async getGrade(studentId: string): Promise<any> {
    return studentGrade(studentId);
  }
}
