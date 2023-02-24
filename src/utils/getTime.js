import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'


export function getTime(time) {
    return dayjs(time).locale(dayjsUkrLocale).format('HH:mm')
}