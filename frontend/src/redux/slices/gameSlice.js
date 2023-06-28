import { createSlice, createSelector } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState:{
    seagame: false,
    indexSelect:false, 
  },
  reducers: {
    setSeagame: (state, action) => {
      const { index } = action.payload;
      state.seagame = index
    },
    destroySeagame: (state,action)=>{
        state.seagame = false
    },
    setIndexSelect: (state,action)=>{
        const {index} = action.payload
        state.indexSelect = index
    }
  },
});

export const { setSeagame,destroySeagame,setIndexSelect } = gameSlice.actions;

export const selectGame = createSelector(
  (state) => state.game,
  (game) => game
);

export default gameSlice.reducer;
