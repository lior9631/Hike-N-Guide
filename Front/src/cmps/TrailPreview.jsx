import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

//Images
import star from '../img/star.svg';
import star_o from '../img/‏‏star-o.svg';

export class TrailPreview extends React.Component {
  state = {
    _id: '',
    name: '',
    country: '',
    rating: 0,
    imgUrls: [],
  };

  componentDidMount() {
    this.setState(this.props.trail);
  }

  render() {
    const {
      _id,
      name,
      country,
      difficulty,
      days,
      distance,
      rating,
      imgUrls,
    } = this.state;
    return (
      <article className="trail-preview">
        <Link to={ `/trail/${_id}` }>
          <img className="trail-preview-image" src={ imgUrls[0] } alt={ name } />
          <div className="trail-preview-info">
            <div className="trail-preview-main-info">
              <span className="trail-preview-name">{name}</span>
              <Rating className="trail-preview-rating" start={ 0 }
                stop={ 5 }
                initialRating={ rating }
                emptySymbol={ <img className="trail-preview-full-star" src={ star } alt="star" /> }
                fullSymbol={ <img className="trail-preview-star" src={ star_o } alt="full-star" /> }
                readonly
              />
            </div>
              <p className="trail-preview-row">
                <span className="trail-preview-heading">Country: </span>{country}
              </p>
              <p className="trail-preview-row">
                <span className="trail-preview-heading">Difficulty: </span>{difficulty}
              </p>
              <p className="trail-preview-row">
                <span className="trail-preview-heading">Days: </span>{days}
              </p>
              <p className="trail-preview-row">
                <span className="trail-preview-heading">Distance: </span>{distance}
              </p>
          </div>
        </Link>
      </article>);
  }
}
