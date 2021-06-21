const {
  createStore,
  combineReducers,
  compose,
  applyMiddleware,
  bindActionCreators,
} = require("redux");

// 1. compose
// const toUpperCase = (str) => str.toUpperCase();

// const repeatString = (str) => str.repeat(3);

// const andSentence = (str) => str + ".";

// const bindThreeFunction = compose(andSentence, repeatString, toUpperCase);

// console.log(bindThreeFunction("hello"));

// 2. createStore

// const reducer = (state = 0, action) => {
//   console.log(action);
//   const { type } = action;
//   if (type == "INCREMENT") return state + 1;
//   return state;
// };

// const replacedReducer = (state = 0, action) => {
//   const { type } = action;
//   if (type == "INCREMENT") return state + 2;

//   return state;
// };

// const store = createStore(reducer);

// store.subscribe(() => {
//   console.log(store.getState());
// });

// store.dispatch({ type: "INCREMENT" });

// console.log(store.getState());

// store.replaceReducer(replacedReducer);

// store.dispatch({ type: "INCREMENT" });

// console.log(store.getState());

// 3. combineReducer

// const countReducer = (state = 0, action) => {
//   const { type, payload } = action;

//   if (type == "count/increment") return state + 1;
//   if (type == "count/decrement") return state - 1;
//   return state;
// };

// const todosReducer = (state = [], action) => {
//   const { type, payload } = action;

//   if (type == "todos/addTodo") {
//     return state.concat(payload);
//   }

//   return state;
// };

// const rootReducer = combineReducers({
//   count: countReducer,
//   todos: todosReducer,
// });

// const store = createStore(rootReducer);

// console.log(store.getState());

// // 4. bindActionCreators
// const ADD_TODO = "todos/addTodo";

// const addTodoCreator = (payload) => {
//   return {
//     type: ADD_TODO,
//     payload,
//   };
// };

// store.dispatch({ type: "todos/addTodo", payload: "Learn React!" });

// console.log(store.getState());

// store.dispatch(addTodoCreator("Learn Angular"));
// console.log(store.getState());

// const bindAddTodoActionCreator = bindActionCreators(
//   addTodoCreator,
//   store.dispatch
// );

// bindAddTodoActionCreator("Learn Vue!");

// console.log(store.getState());

// 5. applyMiddleware
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const INCREMENT_ASYNC = "INCREMENT_ASYNC";

const incrementActionCreator = () => ({
  type: INCREMENT,
});

const decrementActionCreator = () => ({
  type: DECREMENT,
});

const incrementAsyncActionCreator = (payload) => ({
  type: INCREMENT_ASYNC,
  payload,
});

const reducer = (state = 0, action) => {
  const { type, payload } = action;
  if (type == INCREMENT) return state + 1;
  if (type == DECREMENT) return state - 1;
  if (type == INCREMENT_ASYNC) return state + payload;
  return state;
};

const createSagaMiddleware = require("redux-saga");

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

const rootSaga = require("./saga");

sagaMiddleware.run(rootSaga);

console.log(store.getState());
