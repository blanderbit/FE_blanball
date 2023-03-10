
import { API } from '../workers/api-worker/api.worker'

import { addMinutes } from '../utils/addMinutes'
import { getDate } from '../utils/getDate'
import { getTime } from '../utils/getTime'


export const prepareEventUpdateData = async (eventId) => {
    const response = await API.EventService.getOneEvent(eventId);
    return {
        ...response.data,
        date: getDate(response.data.date_and_time),
        time: getTime(response.data.date_and_time),
        end_time: addMinutes(getTime(response.data.date_and_time), response.data.duration),
        is_price: !!response.data.price,
    }
}