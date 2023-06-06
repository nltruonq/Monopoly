import { createSlice,createSelector } from '@reduxjs/toolkit';


const cellSlice = createSlice({
  name: 'cell',
  initialState: [],
  reducers: {
    buyHouse: (state, action) => {
      const { turnOfUser, boardIndex,level } = action.payload;
      const bought= state.find((elm)=>{
        return elm?.boardIndex === boardIndex
      })
      if(bought) {
        state[state.indexOf(bought)].owner=turnOfUser
      }
      else {
        state.push({owner:turnOfUser,boardIndex,level})
      }
    },
    houseByIndex: (state,action)=>{
      const {boardIndex}= action.payload
      const bought= state.find((elm)=>{
        return elm?.boardIndex === boardIndex
      })
      return bought
    }
  },
});

export const { buyHouse,houseByIndex } = cellSlice.actions;

export const selectCell = createSelector(
    (state) => state.cell,
    (cell)=>cell
  );

export default cellSlice.reducer;
