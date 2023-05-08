import { CONSTS } from '../../../../consts';
import { Enum } from './filter.utils';

export const filterConfigForUsers = {
  page: Number,
  profile__age: Number,
  profile__position: new Enum(
    CONSTS.profile.position.map(({ value }) => value)
  ),
  profile__gender: new Enum(['Man', 'Woman', '']),
  is_online: Boolean, // TODO add in client
  search: String,
  ordering: new Enum([
    'id',
    'profile__age',
    'raiting',
    '-id',
    '-profile__age',
    '-raiting',
  ]),
  skipids: Number,
  dist: Number,
  point: Number,
  profile__age_min: Number,
  profile__age_max: Number,
};

export const filterConfigForRelevantUsers = {
  page: Number,
  search: String,
  skipids: Array,
};

export const filterConfigForReviews = {
  page: Number,
};

export const filterConfigForUserReviews = {
  id: Number,
  page: Number,
};

export const filterConfigForEvents = {
  id: Number,
  page: Number,
  gender: new Enum(['Man', 'Woman', '']),
  type: new Enum(['Football', 'Futsal']),
  need_ball: Boolean,
  search: String,
  status: String,
  ordering: new Enum(['id', '-id']), // TODO add date in backend
  skipids: Number,
  duration: Number,
  dist: String,
  point: String,
  place: String,
  date_and_time_after: String,
  date_and_time_before: String,
}; // TODO Add search by members list
