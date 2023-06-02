import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cellReducer from './cellSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cell: cellReducer
  },
});

export default store;