import reviewService from '../../services/review.service';


export function loadReviews() {
  return async dispatch => {
    try {
      const reviews = await reviewService.query();
      dispatch(setReviews(reviews));
      return reviews;
    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err);
    }
  };
}

export function LoadReview(id) {
  return async dispatch => {
    try {
      const review = await reviewService.getById(id);
      dispatch({ type: 'SET_REVIEW', review });
    } catch (err) {
      console.log('ops', err);
    }
  };
}


export function saveReview(review) {
  return async dispatch => {
    try {
      const currReview = await reviewService.add(review);
      return dispatch(_addReview(currReview));
    } catch (err) {
      console.log('error', err);
    }
  };
}


export function editReview(review) {
  return async dispatch => {
    try {
      const currReview = await reviewService.edit(review.review);
      dispatch({
        type: 'EDIT',
        review: {
          currReview,
        },
      });
    } catch (err) {
      console.log('error', err);
    }
  };
}


export function removeReview(reviewId) {
  return async dispatch => {
    await reviewService.remove(reviewId);
    dispatch(_removeReview(reviewId));
  };
}


export function setReviews(reviews) {
  return {
    type: 'SET_REVIEWS',
    review: reviews,
  };
}


export function _removeReview(reviewId) {
  return {
    type: 'DELETE',
    reviewId,
  };
}


function _addReview(review) {
  return {
    type: 'ADD',
    review,
  };
}
