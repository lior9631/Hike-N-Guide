import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import TrailsFilter from '../cmps/TrailsFilter';
import { List } from '../cmps/List';
// import { ReviewList } from '../cmps/ReviewList';


import { loadTrails } from '../store/actions/trailsActions';


class _TrailPage extends Component {
  componentDidMount() {
    this.props.loadTrails();
  }

  render() {
    const { trails } = this.props;
    return (

            <main className="trail-page">
                {this.props.trails && <React.Fragment>
                    <h2 className="trail-page-main-heading">Choose your trail</h2>
                    {/* <Link to="trail/add">Add Trail</Link> */}
{/* {    console.log(this.props)} */}
                    <React.Fragment>
                        {/* < TrailAdd /> */}

                    </React.Fragment>


                    {/* country filter section starts here */}

                    <section>
                        {/* <input name="country"  type="text" placeholder="search trails in country" /> */}
                    </section>

                    {/* country filter section ends here */}


                    {/* side-filter starts here */}
                    {/* <TrailsFilter /> */}
                    {/* side-filter ends here */}


                    {/* previews */}

                    {/* uncomment when previews are ready */}
                    <List items={ trails } />
                </React.Fragment>}
            </main>
    );
  }
}

const mapStateToProps = state => ({
  trails: state.trail.trails,
});
const mapDispatchToProps = {
  loadTrails,
};
export const TrailPage = connect(mapStateToProps, mapDispatchToProps)(_TrailPage);
