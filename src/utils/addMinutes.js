export function addMinutes(time, minutesToAdd) {
    let timeArray = time.split(':');
    let hours = timeArray[0];
    let originalMinutes = timeArray[1];
    let date = new Date();
    date.setHours(hours);
    date.setMinutes(originalMinutes);
    date.setMinutes(date.getMinutes() + minutesToAdd);
    return date.toTimeString().substr(0, 5);
}