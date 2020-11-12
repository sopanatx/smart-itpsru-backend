import { BadRequestException } from '@nestjs/common';
import { ErrorMessage } from '../Error';
async function checkStudentMajor(studentId): Promise<void> {
  const studentYear = studentId.slice(0, 2);
  const studentMajor = studentId.slice(2, 8);
  const studentNo = studentId.slice(8, 10);

  if (studentYear > 64 || studentYear < 60) {
    throw new BadRequestException({
      errorCode: 2001,
      message: ErrorMessage.STUDENT_YEAR_RESTRICT,
    });
  } else if (studentMajor != 122240) {
    throw new BadRequestException({
      errorCode: 2002,
      message: ErrorMessage.STUDENT_MAJOR_RESTRICT,
    });
  } else if (studentNo > 65) {
    throw new BadRequestException({
      errorCode: 2003,
      message: ErrorMessage.STUDENT_ID_INVALID,
    });
  }
}
export { checkStudentMajor };
