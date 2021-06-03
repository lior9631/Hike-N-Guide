import trailService from '../../services/trail.service';

export function loadTrails() {
  return async dispatch => {
    try {
      const trails = await trailService.query();
      dispatch(setTrails(trails));
    } catch (err) {
      console.log('ReviewActions: err in loadTrails', err);
    }
  };
}

export function loadTrail(id) {
  return async dispatch => {
    try {
      const trail = await trailService.getById(id);
      dispatch({ type: 'SET_TRAIL', trail });
    } catch (err) {
      console.log('ops', err);
    }
  };
}



export function saveTrail(trail) {
  return async dispatch => {
    try {
      const currTrail = await trailService.add(trail);
      dispatch({
        type: 'ADD',
        trail: {
          ...currTrail,
        },
      });
    } catch (err) {
      console.log('error', err);
    }
  };
}


export function editTrail(trail) {
  return async dispatch => {
    try {
      const currTrail = await trailService.edit(trail);
      dispatch({
        type: 'EDIT',
        trail: {
          currTrail,
        },
      });
    } catch (err) {
      console.log('error', err);
    }
  };
}


export function removeTrail(trailId) {
  return async dispatch => {
    await trailService.remove(trailId);
    dispatch(_removeTrail(trailId));
  };
}


function setTrails(trails) {
  return {
    type: 'SET_TRAILS',
    trails,
  };
}


function _removeTrail(trailId) {
  return {
    type: 'DELETE',
    trailId,
  };
}
