import {
  Controller,
  Get,
  UseGuards,
  Param,
  MethodNotAllowedException,
  Request,
  Body,
  Post,
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

  @UseGuards(JwtAuthGuard)
  @Get('/class')
  async getClass(@GetUser() user): Promise<any> {
    const { username } = user;
    return await this.studentService.getClass(username);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/grade')
  async getGrade(@GetUser() user, @Body() body): Promise<any> {
    const { username } = user;
    console.log('body', body);
    const { semester } = body;
    return await this.studentService.getGradeData(username, semester);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/semester_list')
  async getSemesterList(@GetUser() user): Promise<any> {
    const { username } = user;
    return this.studentService.getSemesterList(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/calendar')
  async getActivityCalendar(@Request() req): Promise<Object> {
    return await this.studentService.getCalendar();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/device_logger')
  async loggerDeviceinfo(): Promise<string> {
    throw new MethodNotAllowedException();
  }
}
