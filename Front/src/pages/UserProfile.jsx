import React, { Component } from 'react';
import { connect } from 'react-redux';

//Services
import UserService from '../services/user.service';
import OrderService from '../services/order.service';

//Pages/Components
import { OrdersList } from '../cmps/OrdersList';

class _UserProfile extends Component {
  state = {
    user: '',
    orders: '',
    orderType: 'userOrder',
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    const user = await UserService.getById(id);
    this.setState({ user });
    this.loadOrders();
  }

   loadOrders = async () => {
     const query = this.state.orderType === 'customerOrder'
       ? { guideId: this.state.user._id }
       : { userId: this.state.user._id };

     const orders = await OrderService.query(query);
     this.setState({ orders });
   }

  render() {
     const { user, orders, orderType } = this.state;
     return user && (
      <main className="user-profile">
        <section className="user-details">
          <img className="user-profile-img" src={ user.imgUrl } alt={ user.fullName } />
          <h2 className="user-profile-name">{user.fullName}</h2>
          <p className="user-profile-row">
            <span className="user-profile-title">Username</span><span>{user.userName}</span>
          </p>
          <p className="user-profile-row">
            <span className="user-profile-title">Email</span><span>{user.email}</span>
          </p>
          <div className="btns-panel">
           <button className="user-profile-btn" onClick={ () => { this.setState({ orderType: 'userOrder' }, this.loadOrders); } }>My orders</button>
           <button className="user-profile-btn" onClick={ () => { this.setState({ orderType: 'customerOrder' }, this.loadOrders); } }>Customer orders</button>
          </div>
         </section>
        {orders && <OrdersList orders={ orders } orderType={ orderType } loadOrders={ this.loadOrders } />}
      </main>
     );
   }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {

};

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfile);
