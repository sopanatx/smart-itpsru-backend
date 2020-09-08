import { Controller, Get, UseGuards, Param } from '@nestjs/common';
import { StudentService } from './student.service';
import { GetUser } from 'src/decorator/getuser.decorator';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @UseGuards(JwtAuthGuard)
  @Get('/activity')
  async getStudentActivity(@GetUser() User): Promise<any> {
    const { username } = User;
    return this.studentService.getActivity(username);
  }

  //@UseGuards(JwtAuthGuard)
  @Get('/grade/:id')
  async getStudentGrade(
    @GetUser() User,
    @Param('id') StudentId: string,
  ): Promise<any> {
    //const { username } = User;
    return this.studentService.getGrade(StudentId);
  }
}
