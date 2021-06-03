import HttpService from './http.service';

export default {
  query,
  getById,
  remove,
  add,
  edit,
};

async function query(filter = null) {
  const reviews = await HttpService.get('review');
  if (!filter) return reviews;
  return reviews.filter(review => {
    if (review.type.guide) {
      return review.type.guide._id === filter.guideId;
    }
    return review.type.trail._id === filter.trailId;
  });
}


function getById(reviewId) {
  return HttpService.get(`review/${reviewId}`);
}

function remove(id) {
  return HttpService.delete(`review/${id}`);
}

async function add(review) {
  review.at = Date.now();
  const addedReview = await HttpService.post('review', review);
  return addedReview;
}

async function edit(review) {
  console.log(review);
  review.isEditMode = false;
  const reviewToEdit = await HttpService.put(`review/${review._id}`, review);
  return reviewToEdit;
}
