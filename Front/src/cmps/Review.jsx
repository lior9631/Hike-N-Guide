import React, { Component } from 'react';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import star from '../img/star.svg';
import star_o from '../img/‏‏star-o.svg';
import { removeReview, editReview } from '../store/actions/reviewActions';


class _Review extends Component {
  state = {
    review: {},
    editMode: false,
  }

  componentDidMount() {
    this.setState({
      review: this.props.review,
    }, () => {
      // console.log(this.state.review)
    });
  }


  onDeleteGuideReview = () => {
    this.props.removeReview(this.props.review._id);
    this.props.getReviewToShow();
  }

  // reviewEditMode = () => {
  //   this.setState({ editMode: true });
  // }

  reviewEditMode = () => {
    this.state.editMode ? this.setState({ editMode: false }) : this.setState({ editMode: true });
    
  }

  onEdit = ev => {
    ev.preventDefault();
    const review = this.state;
    console.log(this.state);
    this.props.editReview(review);
  }


  handledChange = ev => {
    const { name, value } = ev.target;
    this.setState(prevState => ({ review: { ...prevState.review, [name]: value } }), () => {
      console.log(this.state.review);
    });
  }

  render() {
    const writtenBy = this.props.review ? this.props.review.by.fullName : null;
    const { txt, rate, title } = this.state.review;
    return (
      <section className="review-container">
        {this.state.review && this.state.editMode ? 
           <form className="" onSubmit={ this.onEdit }>
          <span>title</span> <input type="text" name="title" value={ title } onChange={ this.handledChange } />
          <br />
          <textarea name="txt" value={ txt } onChange={ this.handledChange }
            cols="30" rows="10" placeholder="What do you think about me?" required>
          </textarea>
          <button className="review-button review-edit-button" onClick={ () => {
          this.reviewEditMode();
        } }>Edit</button>
        </form>
      : <div className="review">
      <div className="review-info">
        <p className="review-info-row review-info-title-row">
          <span className="review-info-heading">Title:</span>
          {title}
        </p>
        <p className="review-info-row">
          <span className="review-info-heading">By:</span>
          {writtenBy}
        </p>
        <p className="review-info-row">
          <span className="review-info-heading">Rating:</span>
          <Rating className="guide-preview-rating" start={ 0 }
          stop={ 5 }
          initialRating={ rate }
          emptySymbol={ <img className="trail-preview-full-star" src={ star } /> }
          fullSymbol={ <img className="trail-preview-star" src={ star_o } /> }
          readonly
        />
        </p>
      </div>
      <p className="review-text">
        {txt}
      </p>
      <div className="review-buttons">
        <button className="review-button review-delete-button" onClick={ () => {
          this.onDeleteGuideReview();
        } }>Delete</button>
        <button className="review-button review-edit-button" onClick={ () => {
          this.reviewEditMode();
        } }>Edit</button>
      </div>
    </div> }

        
      </section>
    );
  }
}


const mapStateToProps = state => ({
  reviews: state.review.reviews,

});
const mapDispatchToProps = {
  removeReview,
  editReview,
};
export const Review = connect(mapStateToProps, mapDispatchToProps)(_Review);
