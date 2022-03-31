// APp => action => reducer => redux store => subcribes to the app
const redux = require("redux");

const createStore = redux.createStore;
const combineReducers = redux.combineReducers;

// create an action
const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

// ACTION CREATORS
function buy_cake() {
  return {
    type: BUY_CAKE,
  };
}

function buy_icecream() {
  return {
    type: BUY_ICECREAM,
  };
}

let initialCakeState = {
  numOfCakes: 5,
};
let initialIceCreamState = {
  numOfIceCreams: 10,
};

// (prevstate,action) => newstate

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer);
console.log(console.log("initial state", store.getState()));

const unsubscribe = store.subscribe(() =>
  console.log("initial state", store.getState())
);

store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_cake());
store.dispatch(buy_icecream());
store.dispatch(buy_icecream());

unsubscribe();
