import { createSlice, createSelector } from '@reduxjs/toolkit';
import avatarDf from "../../assets/images/avatar_default.jpg"

const userSlice = createSlice({
  name: 'user',
  initialState: [
    { balance: 1000, prison:0 ,username:false,avatar:avatarDf},
    { balance: 1000, prison:0 ,username:false,avatar: avatarDf},
    { balance: 400, prison:0 ,username:false,avatar: avatarDf},
    { balance: 400, prison:0 ,username:false,avatar: avatarDf},
  ],
  reducers: {
    updateBalance: (state, action) => {
      const { turnOfUser, amount } = action.payload;
      const user = state[turnOfUser]
      if (user) {
        user.balance += amount;
      }
    },
    setBalance:(state,action)=>{
      const {turnOfUser,amount}=action.payload
      const user = state[turnOfUser]
      if(user){
        user.balance= amount
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
        state[i].avatar = players[i].avatar
      }
    }

  },
});

export const { updateBalance,secondaryUpdateBalance,updatePrison,setUsername,setBalance } = userSlice.actions;

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

export default userSlice.reducer;
