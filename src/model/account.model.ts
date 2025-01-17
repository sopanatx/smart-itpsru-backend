export class account {
  id: String;
  studentId: String;
  studentFirstName: String;
  studentLastName: String;
  studentEmail: String;
  studentPassword: String;
  isActivate: Boolean;
  loginAttempt: Number;
  userLevel: userLevel;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
enum userLevel {
  ADMIN,
  STUDENT,
  TEACHER,
}
