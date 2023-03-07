
import { API } from '../workers/api-worker/api.worker'

import { addMinutes } from '../utils/addMinutes'
import { getDate } from '../utils/getDate'
import { getTime } from '../utils/getTime'


export const prepareEventUpdateData = async (eventId) => {
    const response = await API.EventService.getOneEvent(eventId);
    return {
        name: response.data.name,
        place: response.data.place,
        status: response.data.status,
        gender: response.data.gender,
        date: getDate(response.data.date_and_time),
        time: getTime(response.data.date_and_time),
        end_time: addMinutes(getTime(response.data.date_and_time), response.data.duration),
        description: response.data.description,
        type: response.data.type,
        need_ball: response.data.need_ball,
        duration: response.data.duration,
        need_form: response.data.need_form,
        date_and_time: response.data.date_and_time,
        forms: response.data.forms,
        count_current_users: response.data.current_users.length,
        count_current_fans: response.data.current_fans.length,
        current_users: response.data.current_users,
        amount_members: response.data.amount_members,
        price: response.data.price,
        is_price: !!response.data.price,
        privacy: response.data.privacy,
        contact_number: response.data.contact_number,
    }
}