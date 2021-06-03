/* eslint-disable max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { Link } from 'react-router-dom';

// services
import userService from '../services/user.service';
import { langCodeToName } from '../services/language.service';

// actions
import { loadReviews } from '../store/actions/reviewActions';

// Components/Pages
import { ReviewAdd } from '../cmps/ReviewAdd';
import { ReviewList } from '../cmps/ReviewList';
import { BookingForm } from '../cmps/BookingForm';

// Images
import star from '../img/star.svg';
import star_o from '../img/‏‏star-o.svg';


class _BookingPage extends Component {
  state = {
    guide: '',
    trailIdx: 0,
    reviewsToShow: [],
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const guide = await userService.getById(id);

    const { currTrail } = this.props;
    this.setState({ guide }, () => { this.setCurrTrailIdx(currTrail); });

    // const reviews = await this.props.loadReviews({ guideId: id });
    // this.setState({ reviews });

    this.getReviewToShow();
  }

  getReviewToShow = async () => {
    const { id } = this.props.match.params;
    const reviews = await this.props.loadReviews({ guideId: id });
    // console.log('reviews from booking page cdm: ', reviews);
    const reviewsToShow = reviews
      .filter(review => review.type.guide)
      .filter(review => review.type.guide._id === id);
    // console.log('reviewsToShow from booking page cdm: ', reviewsToShow);
    this.setState(prevState => ({ ...prevState, reviewsToShow }));
  }

  setCurrTrailIdx = currTrail => {
    if (currTrail) {
      const trailIdx = this.state.guide.trails.findIndex(trail => (
        trail._id === currTrail._id));
      if (trailIdx !== -1) this.setState({ trailIdx });
    }
  }

  setTrailIdx = ev => {
    const { name } = ev.target;
    const value = parseInt(ev.target.value, 10);

    this.setState({ [name]: value });
  }


  render() {
    const { guide, trailIdx, reviewsToShow } = this.state;
    // console.log('reviewsToShow from booking page render: ', reviewsToShow);


    return (
      <main className="booking-page">
        {guide
          && <div className="booking-page-container">
            <section className="booking-page-content">
              <div className="booking-page-details">
                <img className="booking-page-avatar" alt={ guide.fullName } src={ guide.imgUrl } width="75px" />
                <p className="booking-page-full-name">{guide.fullName}</p>
                <p className="booking-page-rate-box" >
                  <span className="pra-rating">Rating:</span>
                  <Rating
                    start={ 0 }
                    stop={ 5 }
                    initialRating={ guide.rating }
                    emptySymbol={ <img src={ star } alt="star" width="16" /> }
                    fullSymbol={ <img src={ star_o } alt="full-star" width="16" /> }
                    readonly
                  />
                  <span className="total-rating">({guide.reviewers_count})</span>
                </p>
                <div>
                  <span className="booking-page-title">Languages:</span>
                  <span>{guide.languages.map(langCodeToName).join(', ')}</span>
                </div>
                <section>
                  <div>
                    <p className="booking-page-description">
                      I’ve traveled to over 100 countries and territories, traveled hundreds of thousands of miles, slept in over a thousand hostels, tried weird food (including fried maggots), made lifelong friends, learned multiple languages, and, most importantly, made it my mission now to help travelers like YOURSELF to realize YOUR travel dreams the same way those five backpackers helped me realize mine.
                    </p>
                  </div>
                  <img
                    className="booking-page-img-trail"
                    src={ guide.trails[trailIdx].imgUrls[0] }
                  />
                </section>
              </div>
              <section className="booking-page-add-review">
                <p className="title">Write a review about {guide.fullName}</p>
                {this.props.loggedInUser
                  ? <ReviewAdd guide={ guide } getReviewToShow={ this.getReviewToShow } />
                  : <div><Link to="/signup">Sign up</Link> or <Link to="/login">Log in</Link> to write your review</div>}
                {guide && this.state.reviewsToShow
                  && <ReviewList reviews={ reviewsToShow } getReviewToShow={ this.getReviewToShow } />
                }
              </section>
            </section>
            <BookingForm guide={ guide } setTrailIdx={ this.setTrailIdx } trailIdx={ trailIdx } />
          </div>}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  reviews: state.review.review,
  currTrail: state.trail.selectedTrail,
});
const mapDispatchToProps = {
  loadReviews,
};
export const BookingPage = connect(mapStateToProps, mapDispatchToProps)(_BookingPage);
