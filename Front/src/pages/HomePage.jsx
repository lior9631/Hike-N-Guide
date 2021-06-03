import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from '../cmps/List';
import { loadTrails } from '../store/actions/trailsActions';
import { loadUsers } from '../store/actions/userAction';

class _HomePage extends Component {
  componentDidMount() {
    this.props.loadTrails();
    this.props.loadUsers();
  }

  render() {
    const { trails, users } = this.props;
    const guides = users.filter(user => user.trails);
    const guidesToShow = guides.sort((a, b) => b.rating - a.rating).slice(0, 8);
    const trailsToShow = trails.sort((a, b) => b.rating - a.rating).slice(0, 6);
    return (
      <main className="homepage">
        <div className="homepage-header">
          <h2 className="homepage-main-heading">Find hiking trails and guides worldwide</h2>
        </div>
        <h2 className="homepage-list-heading">Popular Trails</h2>
        <List items={ trailsToShow }/>
        <Link to="/trail" style={ { textDecoration: 'none' } }>
          <button className="homepage-show-more-button">
            Show all
          </button>
        </Link>
        <h2 className="homepage-list-heading">Popular Guides</h2>
        <List items={ guidesToShow }/>
        <Link to="/guide" style={ { textDecoration: 'none' } }>
          <button className="homepage-show-more-button">
            Show all
          </button>
        </Link>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  trails: state.trail.trails,
  users: state.user.users,
});

const mapDispatchToProps = {
  loadTrails,
  loadUsers,
};
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);
