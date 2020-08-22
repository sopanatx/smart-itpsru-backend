import * as cheerio from 'cheerio';
import axios from 'axios';

export async function studentActivity(studentId: String): Promise<any> {
  const respo = await axios.get(
    `https://gazw5fi7d2.execute-api.ap-southeast-1.amazonaws.com/production/activity/${studentId}`,
  );
  const tablist = ['tab1', 'tab2', 'tab3', 'tab4'];
  const $ = cheerio.load(respo.data);

  const info = $('searchtable').each((index, element) => {
    console.log($(element).text());
  });

  return {
    studentName: info[1],
    studentFaculty: info[2],
    studentMajor: info[3],
  };
}
