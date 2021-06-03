
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../history';
import { loadUsers } from '../store/actions/userAction';
import { loadReviews } from '../store/actions/reviewActions';
// import { loadTrail } from '../store/actions/trailsActions';
import {
  loadTrail,
  removeTrail,
  loadTrails,
  editTrail,
} from '../store/actions/trailsActions';
import { GuidePreview } from '../cmps/GuidePreview';
import MapContainer from '../cmps/MapContainer';
import { ReviewList } from '../cmps/ReviewList';
import { ReviewAdd } from '../cmps/ReviewAdd';

class _TrailDetailsPage extends React.Component {
  state = {
    isEditMode: false,
    usersToShow: null,
    reviews: [],
  }

  async componentDidMount() {
    this.props.loadUsers();

    const { id } = this.props.match.params;
    this.props.loadTrail(id)
      .then(() => {
        this.setState(prevState => ({
          ...prevState,
          selectedTrail: this.props.trail.selectedTrail,
          usersToShow: this.props.users
            .filter(
              user => (!user.trails ? false : user.trails.some(
                trail => trail._id === this.props.trail.selectedTrail.id,
              )),
            )
            .sort((a, b) => b.rating - a.rating),
        }));
      });

    this.getReviewToShow();
  }

  getReviewToShow = async () => {
    const { id } = this.props.match.params;

    const reviews = await this.props.loadReviews({ trailId: id });
    if (reviews) {
      const trailReviews = reviews
        .filter(review => review.type.trail)
        .filter(review => review.type.trail._id === id);

      this.setState({ reviews: trailReviews });
    }
  }

  inputHandler = ({ target }) => {
    const { name } = target;
    const { value } = target;
    this.setState(prevState => ({
      ...prevState,
      selectedTrail: {
        ...prevState.selectedTrail,
        [name]: value,
      },
    }));
  }

  onEditHandler = () => {
    this.setState(prevState => ({ ...prevState, isEditMode: true }));
    console.log(this.state);
  }

  onFinishEditHandler = ev => {
    ev.preventDefault();
    this.setState({ isEditMode: false });
    const { selectedTrail } = this.state;
    this.props.editTrail(selectedTrail)
      .then(() => {
        this.props.loadTrails();
      });
  }

  render() {
    if (this.state.isEditMode) {
      const {
        name, country, difficulty, distance, days, imgUrls, descriptions,
      } = this.state.selectedTrail;

      return (
        <div className="">
          <form className="trail-details-edit-form" onSubmit={ this.onFinishEditHandler }>
            <label>
              name:<input type="text" name="name" value={ name } onChange={ this.inputHandler } />
            </label>
            <label>
              country: <input className="" type="text" value={ country } name="country" onChange={ this.inputHandler } />
            </label>
            <label>
              distance: <input className="" type="text" value={ distance } name="distance" onChange={ this.inputHandler } />
            </label>
            <label>
              difficulty:<select name="difficulty" value={ difficulty } onChange={ this.inputHandler }>
                <option value="Beginner">Beginner</option>
                <option value="Advanced">Advanced</option>
                <option value="Expect">Expect</option>
              </select>
            </label>
            <label>
              days: <input type="number" value={ days } name="days" onChange={ this.inputHandler } />
            </label>

            <label>
              imgs: <input type="text" value={ imgUrls } name="imgUrls" onChange={ this.inputHandler } />
            </label>
            <br />
            <label>
              descriptions: <textarea cols="80" rows="30" value={ descriptions } name="descriptions" onChange={ this.inputHandler }></textarea>
            </label>
            <button className="">Finish Edit</button>
          </form>
        </div>
      );
    }

    const { selectedTrail, usersToShow, reviews } = this.state;
    return (<React.Fragment>
      {selectedTrail && <main className="trail-details">
        <div className="trail-details-main-image" style={ { backgroundImage: `url(${selectedTrail.imgUrls[0]})` } }>
          <h1 className="trail-details-main-header">{selectedTrail.name}</h1>
        </div>
        <section className="trail-details-container">
          <h2 className="trail-details-info-header">
            Check guides for this trail
          </h2>
          <div className="trail-details-guides-list">
            {usersToShow
              && usersToShow
                .map(guide => <GuidePreview key={ guide._id } guide={ guide } />)}
          </div>
          <section className="trail-details-info">
            <div className="trail-details-info-main">
              <h2 className="trail-details-info-header">
                Trail info
              </h2>
              <p>
                <span className="trail-details-info-heading">Description: </span>{selectedTrail.descriptions}
              </p>
              <p>
                <span className="trail-details-info-heading">Country: </span>{selectedTrail.country}
              </p>
              <p>
                <span className="trail-details-info-heading">Difficulty: </span>{selectedTrail.difficulty}
              </p>
              <p>
                <span className="trail-details-info-heading">Days: </span>{selectedTrail.days}
              </p>
              <p>
                <span className="trail-details-info-heading">Distance: </span>{selectedTrail.distance}
              </p>
              <p>
                <span className="trail-details-info-heading">Rating: </span>{selectedTrail.rating}
              </p>
              <div className="trail-details-images">
                {selectedTrail.imgUrls.map((image, i) => <img
                  key={ i }
                  className="trail-details-image"
                  alt={ selectedTrail.name }
                  src={ selectedTrail.imgUrls[i] }
                />)}
              </div>
            </div>
            <div className="trail-details-info-aside">
              <h2 className="trail-details-info-header">
                Trail location
              </h2>
              <div className="trail-details-map-container">
                <MapContainer location={ selectedTrail.location } />
              </div>
              <h2 className="trail-details-info-header">
                Add review
              </h2>
              {this.props.loggedInUser
                ? <ReviewAdd getReviewToShow={ this.getReviewToShow } trail={ this.state.selectedTrail } />
                : <div><Link to="/signup">Sign up</Link> or <Link to="/login">Log in</Link> to write your review</div>}
              <h2 className="trail-details-info-header no-padding-start">
                Trail reviews
              </h2>
              {/* {this.state.reviews.length > 0
                && <ReviewList reviews={ reviews } />
              } */}
              <ReviewList reviews={ reviews } getReviewToShow={ this.getReviewToShow } />
            </div>
          </section>
        </section>
        {this.props.loggedInUser && this.props.loggedInUser.isAdmin
        && <section className="trail-details-controls">
          <Link className="trail-details-button trail-details-back-button" to={ '/trail' } > Back to List </Link>
          <button
            className="trail-details-button trail-details-edit-button"
            onClick={ () => { this.onEditHandler(); } }>
            Edit trail
          </button>
          <button
            className="trail-details-button trail-details-remove-button"
            onClick={ () => {
              this.props.removeTrail(selectedTrail._id)
                .then(() => history.push('/trail'));
            }
            }>
            Delete Trail
            </button>
        </section>}
        <section>
        </section>
      </main>}
    </ React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  users: state.user.users,
  trail: state.trail,
  isLoading: state.loading.isLoading,
  reviews: state.review,
});
const mapDispatchToProps = {
  loadUsers,
  loadTrail,
  loadTrails,
  removeTrail,
  editTrail,
  loadReviews,
};
export const TrailDetailsPage = connect(mapStateToProps, mapDispatchToProps)(_TrailDetailsPage);
