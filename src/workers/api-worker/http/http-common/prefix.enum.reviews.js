export const ReviewsEnpointsEnum = {
  GetUserReviews: (userId) => `/reviews/client/user/reviews/list/${userId}`,
  GetMyReviews: '/reviews/client/my/reviews/list',
  CreateEventReview: '/reviews/client/review/event/review/create',
};
