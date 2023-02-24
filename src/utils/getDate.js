import dayjs from 'dayjs'
import dayjsUkrLocale from 'dayjs/locale/uk'

export function getDate(date) {
    return dayjs(date)
        .locale(dayjsUkrLocale)
        .format(
            Number(dayjs(date).locale(dayjsUkrLocale).format('YYYY')) ===
                new Date().getFullYear()
                ? 'D MMMM'
                : ' D MMMM, YYYY'
        );
}