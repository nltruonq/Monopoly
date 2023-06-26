import { createSlice, createSelector } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: [
    { balance: 500, prison:0 },
    { balance: 500, prison:0 },
    { balance: 500, prison:0 },
    { balance: 500, prison:0 },
  ],
  reducers: {
    updateBalance: (state, action) => {
      const { turnOfUser, amount } = action.payload;
      console.log(turnOfUser)
      const user = state[turnOfUser]
      if (user) {
        user.balance += amount;
      }
    },
    secondaryUpdateBalance: (state, action) => {
      const { turnOfUser, amount } = action.payload;
      const user = state[turnOfUser]
      if (user) {
        user.balance += amount;
      }
    },
    updatePrison: (state,action)=>{
      const {turnOfUser, turns} = action.payload;
      const user= state[turnOfUser]
      if(user){
        user.prison += turns;
      }
    } ,
  },
});

export const { updateBalance,secondaryUpdateBalance,updatePrison } = userSlice.actions;

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

export default userSlice.reducer;
