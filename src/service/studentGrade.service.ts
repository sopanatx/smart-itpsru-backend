import * as cheerio from 'cheerio';
import axios from 'axios';

export async function studentGrade(studentId: string) {
  const response = await axios.get(
    `https://gazw5fi7d2.execute-api.ap-southeast-1.amazonaws.com/production/grade/${studentId}`,
  );
  const $ = cheerio.load(response.data);
  const scrappedTable = [];
  const gradeTable = $(
    'body > center > table > tbody > tr > td > font > center:nth-child(2) > table > tbody > tr > td > table > tbody > tr > td',
  ).each((index, element) => {
    scrappedTable.push($(element).text());
  });
  const studentInfo = [];
  $(
    'body > center > table > tbody > tr > td > font > center:nth-child(2) > table > tbody > tr > td > font:nth-child(1) > center',
  ).each((index, element) => {
    let parseinfo = $(element)
      .text()
      .split(' ', 10);
    studentInfo.push(
      Object.assign({
        studentId: parseinfo[1],
        studentFirstName: parseinfo[4],
        studentLastName: parseinfo[6],
        graduatedFrom: parseinfo[8],
      }),
    );
  });

  const GroupGrade = [];

  for (let i = 1; i < scrappedTable.length / 7; i++) {
    GroupGrade.push(scrappedTable.slice(i * 7, i * 7 + 7));
  }

  let StudentGrade = [];
  for (let j = 0; j < GroupGrade.length; j++) {
    StudentGrade.push(
      Object.assign({
        term: GroupGrade[j][0],
        section: GroupGrade[j][1],
        subjectCode: GroupGrade[j][2],
        subjectName: GroupGrade[j][3],
        credit: GroupGrade[j][4],
        studentGrade: GroupGrade[j][5],
        subjectGroup: GroupGrade[j][6],
      }),
    );
  }
  return { studentInfo, StudentGrade };
}
