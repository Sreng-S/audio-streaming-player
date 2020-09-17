export const formatDuration = duration => {
  const totalSecs = Math.round(duration);
  let minutes = Math.floor(totalSecs / 60);
  minutes = ('0' + minutes).slice(-2);
  let seconds = totalSecs - minutes * 60;
  seconds = ('0' + seconds).slice(-2);
  return `${minutes}:${seconds}`;
};
