import React, { Component } from 'react';
import { connect } from 'react-redux';
import Calendar from 'react-calendar';
import history from '../history';
import 'react-calendar/dist/Calendar.css';

//services
import userService from '../services/user.service';
import trailService from '../services/trail.service';
import orderService from '../services/order.service';

// Components/Pages
import { Modal } from './Modal';

class _BookingForm extends Component {
  state = {
    bookForm: {
      trailIdx: this.props.trailIdx,
      peopleCount: 1,
      date: new Date(),
    },
  };

  handelInput = ev => {
    const { name } = ev.target;
    const value = ev.target.type === 'number' ? parseInt(ev.target.value, 10) : ev.target.value;

    this.setState(prevState => ({ bookForm: { ...prevState.bookForm, [name]: value } }),
      () => { console.log('state:', this.state); });
  }

  handelTrailIdx = ev => {
    this.props.setTrailIdx(ev);
    this.handelInput(ev);
  }

  handelDate = date => {
    this.setState(prevState => ({ bookForm: { ...prevState.bookForm, date } }));
  }

  onBook = async ev => {
    ev.preventDefault();
    let newOrder = this.getNewOrder();
    newOrder = await orderService.save(newOrder);
    history.push(`/profile/${newOrder.buyerUser._id}`);
  }

  getNewOrder() {
    const { guide } = this.props;
    const { peopleCount, date, trailIdx } = this.state.bookForm;

    const newOrder = {
      peopleCount,
      trailAt: Date.parse(date),
      isConfirmed: false,
      isCanceled: false,
    };

    newOrder.buyerUser = this.props.loggedInUser;
    newOrder.buyerUser.isDeleted = false;
    newOrder.guide = userService.getMiniUserObj(this.props.guide);
    newOrder.guide.isDeleted = false;
    const selectedTrail = guide.trails[trailIdx];
    newOrder.trail = trailService.getMiniTrailObj(selectedTrail);
    newOrder.price = guide.price;
    return newOrder;
  }


  render() {
    const { guide } = this.props;
    const { bookForm } = this.state;

    return (
      <form className="booking-form" onSubmit={this.onBook}>
        <select
          className="booking-form-selected-trail"
          name="trailIdx"
          onChange={this.handelTrailIdx}
          value={bookForm.trailSelected}>
          {
            guide.trails.map((trail, idx) => (
              <option key={trail._id} value={idx}>{trail.name}</option>))
          }
        </select>
        <Calendar
          onChange={date => { this.handelDate(date); }}
          value={bookForm.date}
          minDate={new Date()}
        />
        <div className="booking-form-people-count-container">
          <label className="booking-form-title">How many people?</label>
          <input className="booking-form-people-count" type="number" name="peopleCount" value={bookForm.peopleCount} min="1" onChange={this.handelInput} />
        </div>
        <div>
          <div className="booking-form-price-container" >
            <label className="booking-form-title">Price:</label>
            <span className="price">${bookForm.peopleCount * guide.price}</span>
          </div>
          <button type="submit" className="booking-form-submit-button">Book</button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  currTrail: state.trail.selectedTrail,
  loggedInUser: state.user.loggedInUser,
});
const mapDispatchToProps = {

};
export const BookingForm = connect(mapStateToProps, mapDispatchToProps)(_BookingForm);
