import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

  // Show "just now" if the difference is less than 60 seconds
  if (diffInSeconds < 60) {
    return 'just now';
  }

  const timeAgoString = timeAgo.format(new Date(date), {
    units: ['minute', 'hour', 'day', 'week', 'month', 'year'],
    round: 'floor'
  });

  // Replace full words with short forms
  return timeAgoString
    .replace(' minutes ago', ' min')
    .replace(' minute ago', ' min')
    .replace(' hours ago', 'h')
    .replace(' hour ago', 'h')
    .replace(' days ago', 'd')
    .replace(' day ago', 'd')
    .replace(' weeks ago', ' weeks')
    .replace(' week ago', ' week')
    .replace(' months ago', ' months')
    .replace(' month ago', ' month')
    .replace(' years ago', ' yr')
    .replace(' year ago', ' yr');
};
