const initState = {
  handle: null
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return {
      ...state,
      handle: action.user
    };

  default:
    return state;
  }
};

export default userReducer;
