export const filterClassDay = day => {
  switch (day) {
    case 1:
      return 'จันทร์';
      break;
    case 2:
      return 'อังคาร';
      break;
    case 3:
      return 'พุธ';
      break;
    case 4:
      return 'พฤหัสบดี';
      break;
    case 5:
      return 'ศุกร์';
      break;
  }
};

export const convertPeriod = period => {
  if (period == '') {
    return 'Nodata';
  }

  switch (period) {
    case '1':
      return '08:30';
    case '2':
      return '09:30';
    case '3':
      return '10.30';
    case '4':
      return '11:30';
    case '5':
      return '12:30';
    case '6':
      return '13:30';
    case '7':
      return '14:30';
    case '8':
      return '15:30';
    case '9':
      return '16:30';
    case '10':
      return '17:30';
  }
};

export const myTrim = x => {
  return x.replace(/^\s+|\s+$/gm, ' ');
};
