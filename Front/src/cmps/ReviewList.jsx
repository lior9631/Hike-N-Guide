import React from 'react';
import { Review } from './Review';

export const ReviewList = props => (


  <section className="review-list">
    { props.reviews.map(review => (
      <Review key={ review._id } review={ review } getReviewToShow={props.getReviewToShow}/>
    ))}
  </section>
);
