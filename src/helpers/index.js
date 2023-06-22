// import {showMessage} from 'react-native-flash-message';

export const validateEmail = email => {
  const regexEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(String(email).toLowerCase());
};

export const isEmpty = text => {
  return text === null ? true : text.length === 0;
};

export const isLength = (text, length) => {
  return text.length < length;
};

// export const alertMessage = (text, type) => {
//   showMessage({
//     message: text,
//     type: type,
//     icon: type,
//   });
// };

export const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export const idrFormat = number => {
  let format = parseInt(number)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&.');
  return 'Rp. ' + format.substring(0, format.length - 3);
};

//

//

// export const dateFormat = dates => {
//   const datum = Date.parse(new Date(dates.replace(/-/g, '/')));
//   let date = new Date(datum),
//     day = date.getDay(),
//     month = date.getMonth(),
//     year = date.getFullYear(),
//     months = [
//       'Januari',
//       'Februari',
//       'Maret',
//       'April',
//       'Mei',
//       'Juni',
//       'Juli',
//       'Agustus',
//       'September',
//       'Oktober',
//       'November',
//       'Desember',
//     ];

//   return day + ' ' + months[month] + ' ' + year;
// };

// export const dayFormat = date => {
//   let days = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];
//   let d = new Date(dateString);
//   let dayName = days[d.getDay()];
//   let dayID;
//   if (dayName === 'Sunday') dayID = 'Minggu';
//   else if (dayName === 'Monday') dayID = 'Senin';
//   else if (dayName === 'Tuesday') dayID = 'Selasa';
//   else if (dayName === 'Wednesday') dayID = 'Rabu';
//   else if (dayName === 'Thursday') dayID = 'Kamis';
//   else if (dayName === 'Friday') dayID = "Jum'at";
//   else if (dayName === 'Saturday') dayID = 'Sabtu';

//   return dayID;
// };

//  let options = {
// weekday: 'long',
// year: 'numeric',
// month: 'long',
// day: 'numeric',
// hour: '2-digit',
// minute: '2-digit',
//  };

// export const dateFormat = (date, withDay, onlyDay) => {
//   let options = {};
//   if (onlyDay) options.weekday = 'long';
//   else {
//     options.year = 'numeric';
//     options.month = 'long';
//     options.day = 'numeric';
//   }
//   if (withDay) options.weekday = 'long';
//   let birth = new Date(date.replace(/-/g, '/'));
//   return birth.toLocaleDateString('id-ID', options);
// };

// export const timeFormat = date => {
//   let event = new Date(date.replace(/-/g, '/'));
//   return event.toLocaleTimeString('id-ID').substring(0, 5);
// };

// export const timeSince = dates => {
//   let date;
//   if (dates.length === 19)
//     date = new Date(dates.replace(/-/g, '/')).toISOString();
//   else date = dates;
//   if (typeof date !== 'object') {
//     date = new Date(date);
//   }

//   let seconds = Math.floor((new Date() - date) / 1000);
//   let intervalType;
//   let interval = Math.floor(seconds / 31536000);
//   if (interval >= 1) {
//     intervalType = 'tahun';
//   } else {
//     interval = Math.floor(seconds / 2592000);
//     if (interval >= 1) {
//       intervalType = 'bulan';
//     } else {
//       interval = Math.floor(seconds / 86400);
//       if (interval >= 1) {
//         intervalType = 'hari';
//       } else {
//         interval = Math.floor(seconds / 3600);
//         if (interval >= 1) {
//           intervalType = 'jam';
//         } else {
//           interval = Math.floor(seconds / 60);
//           if (interval >= 1) {
//             intervalType = 'menit';
//           } else {
//             interval = seconds;
//             intervalType = 'detik';
//           }
//         }
//       }
//     }
//   }
//   if (intervalType === 'detik') return 'Baru saja';
//   else return interval + ' ' + intervalType + ' yang lalu';
// };
