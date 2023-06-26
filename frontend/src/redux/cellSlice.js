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
        state[state.indexOf(bought)].level = level // update
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
    },
    destroyHouse:(state,action)=>{
      const {boardIndex} = action.payload
      const index = state.findIndex(elm => elm.boardIndex === boardIndex);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  },
});

export const { buyHouse,houseByIndex,destroyHouse } = cellSlice.actions;

export const selectCell = createSelector(
    (state) => state.cell,
    (cell)=>cell
  );

export default cellSlice.reducer;
