export const setUser = user => {
  return {
    type: 'SET_USER',
    user
  };
};

export const getAllUsers = users => {
  return {
    type: 'GET_ALL_USERS',
    users
  };
};
