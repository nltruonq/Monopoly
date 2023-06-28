import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cellReducer from './slices/cellSlice';
import gameReducer from './slices/gameSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cell: cellReducer,
    game:gameReducer,
  },
});

export default store;