import React from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { logout } from '../store/actions/userAction';
import history from '../history';
import logo from '../logo.svg';

class _Navbar extends React.Component {
  state = {
    headerColorClass: '',
    menuActiveClass: '',
    navOpenedClass: '',
    // loggedInUser: null,
  };

  componentDidMount() {
    // this.setState(prevState => ({
    //   ...prevState,
    //   loggedInUser: this.props.loggedInUser,
    // }), () => { console.log(this.state.loggedInUser);
    // });
  }

  setHeaderColor = () => {
    if (history.location.pathname === '/') {
      this.setState(prevState => ({ ...prevState, headerColorClass: '' }));
      window.addEventListener('scroll', this.handleScroll);
    } else {
      window.removeEventListener('scroll', this.handleScroll);
      this.setState(prevState => ({ ...prevState, headerColorClass: 'header-colored' }));
    }
  }


  handleScroll = () => {
    if (window.pageYOffset > 50) {
      if (!this.state.headerColorClass) {
        this.setState(prevState => ({ ...prevState, headerColorClass: 'header-colored' }));
      }
    } else if (this.state.headerColorClass) {
      this.setState(prevState => ({ ...prevState, headerColorClass: '' }));
    }
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      ...prevState,
      menuActiveClass: prevState.menuActiveClass === 'is-active' ? '' : 'is-active',
      navOpenedClass: prevState.navOpenedClass === 'opened' ? '' : 'opened',
    }));
  }

  handleLoginClick = () => {
    history.push('/login');
  }

  handleLogoutClick = () => {
    this.props.logout();
    this.setState(prevState => ({ ...prevState, loggedInUser: null }));
  }

  render() {
    const { loggedInUser } = this.props;
    return (
      <header className={ `main-header ${this.state.headerColorClass}` }>
          <Link
          className="main-header-home-link"
          to="/"
          onClick={ () => { history.push('/'); } }>
            {/* <h1 className="main-header-logo">
              Hike & Guide
            </h1> */}
            <img src={ logo } alt="HIKE&GUIDE" className="main-header-logo"/>
          </Link>
          <nav
          className={ `main-header-nav ${this.state.navOpenedClass}` }
          onClick={ () => this.toggleMenu() }>
            <NavLink exact className="main-header-link" to="/" activeClassName="selected">Home</NavLink>
            <NavLink className="main-header-link" to="/trail" activeClassName="selected">Trails</NavLink>
            <NavLink className="main-header-link" to="/guide" activeClassName="selected">Guides</NavLink>
            <div
              className="main-header-link"
              onClick={ loggedInUser ? this.handleLogoutClick : this.handleLoginClick }>
              {/* to={ loggedInUser ? '/logout' : '/login' }
              activeClassName="selected"> */}
                {loggedInUser ? 'Logout' : 'Login'}
            </div>
            { loggedInUser
              && <NavLink
                  to={ `/profile/${loggedInUser._id}` }
                  className="main-header-link"
                  activeClassName="selected"
                >
                  <img src={ loggedInUser.imgUrl } alt={ loggedInUser.fullName } className="user-profile-link-image"/>
                </NavLink
            >}
          </nav>
          <button
          className={ `hamburger hamburger--spin ${this.state.menuActiveClass}` }
          type="button"
          onClick={ () => this.toggleMenu() }>
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  logout,
};

export const Navbar = connect(mapStateToProps, mapDispatchToProps)(_Navbar);
