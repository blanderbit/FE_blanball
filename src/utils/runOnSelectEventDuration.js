import { addZeroBefore } from './addZeroBefore'

export const runOnSelectEventDuration = (durationValue, data) => {
  let eventStartTime;
  if (data.values.time) {
    let timeStr = data.values.time;
    let [hours, minutes] = timeStr.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    eventStartTime = date;
  } else {
    eventStartTime = new Date(new Date().getTime() + 65 * 60000);
  }
  const eventEndDateTime = new Date(eventStartTime.getTime() + durationValue);
  data.values.time = `${addZeroBefore(
    eventStartTime.getHours()
  )}:${addZeroBefore(eventStartTime.getMinutes())}`;
  data.values.end_time = `${addZeroBefore(
    eventEndDateTime.getHours()
  )}:${addZeroBefore(eventEndDateTime.getMinutes())}`;
  data.values.duration = durationValue / 60000;
};
