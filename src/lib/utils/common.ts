import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const timestampToString = (timestamp: number | undefined) => {
  if (timestamp === 0 || timestamp === undefined || timestamp === null) {
    return {
      date: '-',
      dateOfLastYear: '-',
      day: '-',
      tomorrow: '-',
      month: '-',
      monthString: '-',
      monthShortName: '-',
      monthFullName: '-',
      monthAndDay: '-',
      year: '-',
      lastYear: '-',
      lastYearDate: '-',
      dateFormatInUS: '-',
      dateFormatForForm: '-',
      time: '-',
    };
  }

  const date = new Date(timestamp * 1000);
  // 設定時區
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = `${date.getHours()}`.padStart(2, '0');
  const minute = `${date.getMinutes()}`.padStart(2, '0');
  const second = `${date.getSeconds()}`.padStart(2, '0');

  const monthIndex = date.getMonth();
  const monthNamesInShort = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
  ];

  const monthFullName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const monthNameWithI18n = [
    'DATE_PICKER.JAN',
    'DATE_PICKER.FEB',
    'DATE_PICKER.MAR',
    'DATE_PICKER.APR',
    'DATE_PICKER.MAY',
    'DATE_PICKER.JUN',
    'DATE_PICKER.JUL',
    'DATE_PICKER.AUG',
    'DATE_PICKER.SEP',
    'DATE_PICKER.OCT',
    'DATE_PICKER.NOV',
    'DATE_PICKER.DEC',
  ];

  const monthNameShort = monthNamesInShort[monthIndex];
  const monthName = monthFullName[monthIndex];
  const dateString = `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;
  const dayString = `${day.toString().padStart(2, '0')}`;
  const monthString = monthNameWithI18n[monthIndex];

  return {
    date: dateString, // e.g. 2021-01-01
    dateOfLastYear: `${year - 1}-${month.toString().padStart(2, '0')}-${day
      .toString()
      .padStart(2, '0')}`, // e.g. 2020-01-01
    day: `${dayString}`, // e.g. 01
    tomorrow: `${year}-${month.toString().padStart(2, '0')}-${(day + 1)
      .toString()
      .padStart(2, '0')}`, // e.g. 2021-01-02
    month: `${month}`.padStart(2, '0'), // e.g. 01
    monthString: `${monthString}`, // e.g. January (with i18n)
    monthShortName: `${monthNameShort}`, // e.g. Jan.
    monthFullName: `${monthName}`, // e.g. January
    monthAndDay: `${monthNameShort} ${day}`, // e.g. Jan. 01
    year: `${year}`, // e.g. 2021
    lastYear: `${year - 1}`, // e.g. 2020
    lastYearDate: `${monthName} ${day}, ${year - 1}`, // e.g. Jan. 01, 2020
    dateFormatInUS: `${monthName} ${day}, ${year}`, // e.g. Jan. 01, 2021
    dateFormatForForm: `${monthNameShort} ${day}, ${year}`, // e.g. Jan. 01, 2021
    time: `${hour}:${minute}:${second}`, // e.g. 00:00:00
  };
};

export const getTimestamp = () => {
  return Math.floor(Date.now() / 1000);
};

export const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
