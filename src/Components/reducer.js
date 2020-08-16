export const initialState = {
  users: [],
  currentUser: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      return { ...state, currentUser: action.payload.user };
    case 'SET_USERS':
      const totalUsers = [...action.payload.users]
      return {...state,  users: totalUsers }
    case 'ADD_USER':
      return {...state, users: {...state.users, ...action.payload.user}}
    
    default:
      return { ...state };
  }
};
