import * as cheerio from 'cheerio';
import axios from 'axios';
import * as iconv from 'iconv-lite';
import { filterClassDay, convertPeriod } from '../utils/dayConverter';
import * as queryString from 'query-string';

export default async function getClass(classID: string): Promise<any> {
  const requestBody = {
    ID_NO: classID,
  };
  const scrappedTable = [];
  const monday = [];
  const tuesday = [];
  const wednesday = [];
  const thursday = [];
  const friday = [];
  const getTable = await axios
    .post(
      'http://202.29.80.113/cgi/LoadTB1.php',
      queryString.stringify(requestBody),
    )
    .then(result => {
      const $ = cheerio.load(result.data);

      for (let i = 3; i < 14; i++) {
        const monday3 = $(
          `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(6)`,
        ).each((index, element) => {
          if (
            $(element)
              .text()
              .trim() == ''
          ) {
            element == null;
          } else {
            const formattedTime = `จันทร์ เวลา: ${convertPeriod(
              $(element)
                .text()
                .substr(0, 1),
            )} - ${convertPeriod(
              $(element)
                .text()
                .substr(2, 3),
            )}`;
            const startTime = $(element)
              .text()
              .substr(0, 1);
            const endTime = $(element)
              .text()
              .substr(2, 3);

            const mondaySubID = $(
              `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`,
            ).each((indexsubcode, elementsubcode) => {
              const mondayClassroom = $(
                ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`,
              ).each((indexroom, elementroom) => {
                const mondayClass = $(
                  ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`,
                ).each((indexclass, elementclass) => {
                  const mondayTeacher = $(
                    ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(11)`,
                  ).each((indexteacher, elementteacher) => {
                    monday.push(
                      Object.assign({
                        subjectCode: $(elementsubcode).text(),
                        subjectName: $(elementclass).text(),
                        subjectClassroom: $(elementroom).text(),
                        subjectTime: formattedTime,
                        subjectTeacher: $(elementteacher).text(),
                      }),
                    );
                  });
                });
              });
            });
          }
        });

        const tuesday3 = $(
          `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(7)`,
        ).each((index, element) => {
          if (
            $(element)
              .text()
              .trim() == ''
          ) {
            element == null;
          } else {
            const formattedTime = `อังคาร เวลา: ${convertPeriod(
              $(element)
                .text()
                .substr(0, 1),
            )} - ${convertPeriod(
              $(element)
                .text()
                .substr(2, 3),
            )}`;
            const startTime = $(element)
              .text()
              .substr(0, 1);
            const endTime = $(element)
              .text()
              .substr(2, 3);
            const tuesdaySubID = $(
              `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`,
            ).each((indexsubcode, elementsubcode) => {
              const tuesdayClassroom = $(
                ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`,
              ).each((indexroom, elementroom) => {
                const tuesdayClass = $(
                  ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`,
                ).each((indexclass, elementclass) => {
                  const tuesdayTeacher = $(
                    ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(11)`,
                  ).each((indexteacher, elementteacher) => {
                    tuesday.push(
                      Object.assign({
                        subjectCode: $(elementsubcode).text(),
                        subjectName: $(elementclass).text(),
                        subjectClassroom: $(elementroom).text(),
                        subjectTime: formattedTime,
                        subjectTeacher: $(elementteacher).text(),
                      }),
                    );
                  });
                });
              });
            });
          }
        });

        const wednesday3 = $(
          `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(8)`,
        ).each((index, element) => {
          if (
            $(element)
              .text()
              .trim() == ''
          ) {
            element == null;
          } else {
            const formattedTime = `พุธ เวลา: ${convertPeriod(
              $(element)
                .text()
                .substr(0, 1),
            )} - ${convertPeriod(
              $(element)
                .text()
                .substr(2, 3),
            )}`;
            const startTime = $(element)
              .text()
              .substr(0, 1);
            const endTime = $(element)
              .text()
              .substr(2, 3);
            const wednesdaySubID = $(
              `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`,
            ).each((indexsubcode, elementsubcode) => {
              const wednesdayClassroom = $(
                ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`,
              ).each((indexroom, elementroom) => {
                const wednesdayClass = $(
                  ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`,
                ).each((indexclass, elementclass) => {
                  const wednesdayTeacher = $(
                    ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(11)`,
                  ).each((indexteacher, elementteacher) => {
                    wednesday.push(
                      Object.assign({
                        subjectCode: $(elementsubcode).text(),
                        subjectName: $(elementclass).text(),
                        subjectClassroom: $(elementroom).text(),
                        subjectTime: formattedTime,
                        subjectTeacher: $(elementteacher).text(),
                      }),
                    );
                  });
                });
              });
            });
          }
        });

        const thursday3 = $(
          `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(9)`,
        ).each((index, element) => {
          if (
            $(element)
              .text()
              .trim() == ''
          ) {
            element == null;
          } else {
            const formattedTime = `พฤหัสบดี เวลา: ${convertPeriod(
              $(element)
                .text()
                .substr(0, 1),
            )} - ${convertPeriod(
              $(element)
                .text()
                .substr(2, 3),
            )}`;
            const startTime = $(element)
              .text()
              .substr(0, 1);
            const endTime = $(element)
              .text()
              .substr(2, 3);
            const thursdaySubID = $(
              `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`,
            ).each((indexsubcode, elementsubcode) => {
              const thursdayClassroom = $(
                ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`,
              ).each((indexroom, elementroom) => {
                const thursdayClass = $(
                  ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`,
                ).each((indexclass, elementclass) => {
                  const thursdayTeacher = $(
                    ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(11)`,
                  ).each((indexteacher, elementteacher) => {
                    thursday.push(
                      Object.assign({
                        subjectCode: $(elementsubcode).text(),
                        subjectName: $(elementclass).text(),
                        subjectClassroom: $(elementroom).text(),
                        subjectTime: formattedTime,
                        subjectTeacher: $(elementteacher).text(),
                      }),
                    );
                  });
                });
              });
            });
          }
        });

        const friday3 = $(
          `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(10)`,
        ).each((index, element) => {
          if (
            $(element)
              .text()
              .trim() == ''
          ) {
            element == null;
          } else {
            const formattedTime = `ศุกร์ เวลา: ${convertPeriod(
              $(element)
                .text()
                .substr(0, 1),
            )} - ${convertPeriod(
              $(element)
                .text()
                .substr(2, 3),
            )}`;
            const startTime = $(element)
              .text()
              .substr(0, 1);
            const endTime = $(element)
              .text()
              .substr(2, 3);
            const fridaySubID = $(
              `body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(1)`,
            ).each((indexsubcode, elementsubcode) => {
              const fridayClassroom = $(
                ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(5)`,
              ).each((indexroom, elementroom) => {
                const fridayClass = $(
                  ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(3)`,
                ).each((indexclass, elementclass) => {
                  const fridayTeacher = $(
                    ` body > center > table > tbody > tr:nth-child(${i}) > td:nth-child(11)`,
                  ).each((indexteacher, elementteacher) => {
                    friday.push(
                      Object.assign({
                        subjectCode: $(elementsubcode).text(),
                        subjectName: $(elementclass).text(),
                        subjectClassroom: $(elementroom).text(),
                        subjectTime: formattedTime,
                        subjectTeacher: $(elementteacher).text(),
                      }),
                    );
                  });
                });
              });
            });
          }
        });
      }
    });
  console.log(monday);
  return {
    classID: classID,
    // requestId: requestId,
    monday: monday,
    tuesday: tuesday,
    wednesday: wednesday,
    thursday: thursday,
    friday: friday,
  };
}
