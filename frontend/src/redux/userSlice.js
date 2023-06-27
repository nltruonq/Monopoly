import { createSlice, createSelector } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: [
    { balance: 500, prison:0 ,username:false},
    { balance: 500, prison:0 ,username:false},
    { balance: 500, prison:0 ,username:false},
    { balance: 500, prison:0 ,username:false},
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
    
    setUsername: (state,action)=>{
      const {players}= action.payload;
      for( let i =0 ;i < players.length;++i){
        state[i].username = players[i].username
      }
    }

  },
});

export const { updateBalance,secondaryUpdateBalance,updatePrison,setUsername } = userSlice.actions;

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

export default userSlice.reducer;
