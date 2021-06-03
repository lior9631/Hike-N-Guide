
import React, { Component } from 'react';

export default class TrailsFilter extends Component {
  render() {
    return (
          <section>
              <div>
                  <p>Hike level</p>
                  <ul>
                      <li>Expert</li>
                      <li>Advanced</li>
                      <li>Beginners</li>
                      <li>Families</li>
                  </ul>
              </div>
              <div>
                  <p>Hike length</p>
                  <ul>
                      <li>above week</li>
                      <li>3-4 days</li>
                      <li> 1-3</li>
                      <li> daily</li>
                  </ul>
              </div>
          </section>
    );
  }
}
