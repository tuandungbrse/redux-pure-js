const { put, takeEvery, all } = require("redux-saga/effects");

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* helloSaga() {
  console.log("Hello Sagas!");
}

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INCREMENT" });
}

function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

module.exports = function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
};
