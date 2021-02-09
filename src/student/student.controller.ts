import {
  Controller,
  Get,
  UseGuards,
  Param,
  MethodNotAllowedException,
  Request,
  Body,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { GetUser } from 'src/decorator/getuser.decorator';
import { JwtAuthGuard } from 'src/auth/strategy/jwt-auth.guard';
import { getClassDto } from './dto/getClass.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('/class')
  async getClass(@GetUser() user): Promise<any> {
    const { username } = user;
    //  console.log(data);
    return await this.studentService.getClass(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/calendar')
  async getActivityCalendar(@Request() req): Promise<Object> {
    return await this.studentService.getCalendar();
    //return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/device_logger')
  async loggerDeviceinfo(): Promise<string> {
    throw new MethodNotAllowedException();
  }
}
