import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { GetUser } from 'src/decorator/getuser.decorator';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/activity')
  async getStudentActivity(@GetUser() user): Promise<any> {
    const { username } = user;
    return this.studentService.getActivity(username);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/grade/:id')
  async getStudentGrade(
    @GetUser() user,
    @Param('id') studentId: string,
  ): Promise<any> {
    //const { username } = User;
    return this.studentService.getGrade(StudentId);
  }

  @Get('/calendar')
  async getActivityCalendar(): Promise<any> {
    return await this.studentService.getCalendar();
  }
}
