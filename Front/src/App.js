import React from 'react';
import './style/global.scss';
import { Switch, Route } from 'react-router-dom';
import { Navbar } from './cmps/Navbar';
import { Footer } from './cmps/Footer';
import { HomePage } from './pages/HomePage';
import { TrailPage } from './pages/TrailPage';
import { BookingPage } from './pages/BookingPage';
import { GuidePage } from './pages/GuidePage';
import { LogIn } from './pages/LogIn';
import { UserProfile } from './pages/UserProfile';
import { TrailDetailsPage } from './pages/TrailDetailsPage';
import TrailAdd from './pages/TrailAdd';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/profile/:id" component={ UserProfile } />
        <Route path="/login" component={ LogIn } />
        <Route path="/booking/:id" component={ BookingPage } />
        <Route path="/trail/add" component={ TrailAdd } />
        <Route path="/trail/:id" component={ TrailDetailsPage } />
        <Route path="/trail" component={ TrailPage } />
        <Route exact path="/guide" component={ GuidePage } />
        <Route exact path="/" component={ HomePage } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
