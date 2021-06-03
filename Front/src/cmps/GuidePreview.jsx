import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

//Images
import star from '../img/star.svg';
import star_o from '../img/‏‏star-o.svg';

export class GuidePreview extends React.Component {
  state = {
    _id: '',
    fullName: '',
    rating: 0,
    languages: [],
    trails: [],
    imgUrl: '',
  }

  componentDidMount() {
    this.setState(this.props.guide);
  }

  handleRatingChangerate = rate => {
    this.setState(prevState => ({ ...prevState, rating: rate }));
  }

  getLangsToShow() {
    const langs = {
      en: 'English',
      he: 'Hebrew',
      ru: 'Russian',
      // enough for demonstration purposes
    };
    const langsToShow = this.state.languages
      .map(lang => `${langs[lang]}` || lang)
      .join(', ');
    return langsToShow;
  }

  getTrailsToShow() {
    if (!this.state.trails) return;
    // eslint-disable-next-line consistent-return
    return this.state.trails
      .map(trail => `${trail.name}`)
      .join(', ');
  }

  render() {
    const {
      _id,
      fullName,
      rating,
      imgUrl,
    } = this.state;
    return (
      <article className="guide-preview">
        <Link to={ `/booking/${_id}` }>
          <img className="guide-preview-image square-ratio" src={ imgUrl } alt={ fullName } />
          <div className="guide-preview-info">
            <div className="guide-preview-main-info">
              <span className="guide-preview-name">{fullName}</span>
              <Rating start={ 0 }
                stop={ 5 }
                initialRating={ rating }
                emptySymbol={ <img className="guide-preview-full-star" src={ star } alt="star" /> }
                fullSymbol={ <img className="guide-preview-star" src={ star_o } alt="full-star" /> }
                readonly
              />
            </div>
            <p className="guide-preview-languages">
              <span className="guide-preview-heading">
                Languages:&nbsp;
              </span>{ this.getLangsToShow() }
            </p>
            <p className="guide-preview-trails">
              <span className="guide-preview-heading">
                Trails:&nbsp;
              </span>{ this.getTrailsToShow() }
            </p>
          </div>
        </Link>
      </article>);
  }
}
