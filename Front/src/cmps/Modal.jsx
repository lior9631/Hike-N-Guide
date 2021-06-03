import React from 'react';
import Popup from 'reactjs-popup';

export function Modal() {
  return (
        <Popup trigger={ <button type="button" className="booking-form-submit-button"> Book </button> } modal>
            {close => (
                <div className="modal">
                    <a className="close" onClick={ close }>
                        &times;
                    </a>
                    <div className="header"> Modal Title </div>
                    <div className="content">
                      {' '}
                  </div>
                    <div className="actions">
                        <button type="submit" className="booking-form-submit-button"> Book </button>
                      <button type="button" className="booking-form-submit-button red" onClick={ () => { close(); } }>Cancel</button>
                    </div>
                </div>
            )}
        </Popup>
  );
}
