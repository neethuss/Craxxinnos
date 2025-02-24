//configureStore creates redux store

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'


//creates redux store
const store = configureStore({
  reducer:{
    user:userReducer // register the user reducer
  }
})

export type RootState = ReturnType<typeof store.getState>//returns the entire redux store
export type AppDispatch = typeof store.dispatch //send actions to redux
export default store