import { createSlice, createSelector } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'game',
  initialState:{
    seagame: false,
    indexSelect:false, 
    type:false,
    host:false
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
    },
    setType: (state,action)=>{
      const {type,host} = action.payload
      state.type=true
      state.host=host
    },
    resetGame:(state,action)=>{
      state = {
        seagame: false,
        indexSelect:false, 
        type:false,
        host:false
      }
    }

  },
});

export const { setSeagame,destroySeagame,setIndexSelect,resetGame,setType } = gameSlice.actions;

export const selectGame = createSelector(
  (state) => state.game,
  (game) => game
);

export default gameSlice.reducer;
