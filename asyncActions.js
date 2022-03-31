const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;
const axios = require("axios");

// state
const initialState = {
  loading: false,
  users: [],
  error: "",
};
// action string constants
const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
// action creators
const users_request = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
const users_success = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};
const users_failure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
// reducer

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

// action creator which returns a function that takes in dispatch as an argument and allows us to perform
// side effects

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(users_request());
    axios
      .get("https://jsonplaceholder.typicode.com/usersi")
      .then((response) => {
        // return the users as response.data
        const users = response.data.map((user) => user.id);
        dispatch(users_success(users));
      })
      .catch((error) => {
        // return error.message
        dispatch(users_failure(error.message));
      });
  };
};

// redux store
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers());
