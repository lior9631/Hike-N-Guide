const initialState = {
  trails: [],
  selectedTrail: null,
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        trails: state.trails.map(trail => {
          if (trail._id === action.trail._id) return action.trail;
          return trail;
        }),
      };
    case 'EDIT':
      return {

        ...state,

        trails: state.trails.map(trail => {
          if (trail._id === action.trail._id) return action.trail;
          action.trail.currTrail.isEditMode = false;
          return trail;
        }),
      };
    case 'DELETE':
      return {
        ...state,
        trails: state.trails.filter(trail => trail._id !== action.trailId),
      };
    case 'SET_TRAILS':
      return {
        ...state,
        trails: action.trails,

      };

    case 'SET_TRAIL':
      return {
        ...state,
        selectedTrail: action.trail,
      };

    default:
      return state;
  }
}
