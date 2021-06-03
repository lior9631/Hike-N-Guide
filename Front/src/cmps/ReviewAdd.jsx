import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import { saveReview, loadReviews } from '../store/actions/reviewActions';

//Images
import star from '../img/star.svg';
import star_o from '../img/‏‏star-o.svg';


class _ReviewAdd extends Component {
  state = {
    rate: 5,
    by: {},
    txt: '',
    type: {},
    title: '',
    editMode: false,
  }

  componentDidMount() {
    if (this.props.guide) {
      const { _id, fullName } = this.props.user;
      const miniUser = { _id, fullName };
      const { guide } = this.props;
      const id = guide._id;
      const guideName = guide.fullName;
      const miniGuide = {
        guide: {
          fullName: guideName,
          _id: id,
        },
      };
      this.setState({ by: miniUser, type: miniGuide });
    }
    if (this.props.trail) {
      const { _id, fullName } = this.props.user;
      const miniUser = { _id, fullName };
      const { trail } = this.props;
      const id = trail._id;
      const trailName = trail.name;
      const miniTrail = {
        trail: {
          _id: id,
          name: trailName,
        },
      };
      this.setState(prevState => ({ ...prevState, by: miniUser, type: miniTrail }), () => {
        // console.log(this.state);
      });
    }
  }

  handledChange = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  }

   onSend = ev => {
     ev.preventDefault();
     const review = this.state;
     console.log('review was sent from ReviewAdd page: ', review)
     this.props.saveReview(review)
       .then(() => {
        this.props.getReviewToShow();
       })
   }

   render() {
     const { rate, txt, title } = this.state;
     const loggedInUser = this.props.user;
     return (
      <React.Fragment>
        {loggedInUser && <section className="review-add">
          <div className="review-add-rate-container">
            <span className="review-add-rate-label">Rate:</span>
            <Rating start={0}
              stop={5}
              initialRating={rate}
              emptySymbol={<img src={star} alt="star" className="img-star" />}
              fullSymbol={<img src={star_o} alt="full-star" className="img-star" />}
              onChange={rate => {
                this.setState({ rate });
              }}
            />
          </div>
          <form className="review-add-form" onSubmit={this.onSend}>
            <label htmlFor="title">Review title:</label>
            <input className="review-add-title" type="text" id="title" name="title" value={title} onChange={this.handledChange} />
            <label htmlFor="text">Review text:</label>
            <textarea className="review-add-textarea" id="text"
              name="txt" value={txt} onChange={this.handledChange}
              cols="30" rows="10" placeholder="What do you think about me?" required>
            </textarea>
            <button className="review-add-submit-btn">Send</button>
          </form>
        </section>}
      </React.Fragment>
     );
   }
}

const mapStateToProps = state => ({
  reviews: state.review.review,
  user: state.user.loggedInUser,
});
const mapDispatchToProps = {
  saveReview,
  loadReviews,
};
export const ReviewAdd = connect(mapStateToProps, mapDispatchToProps)(_ReviewAdd);
