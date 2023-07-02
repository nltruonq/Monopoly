import { createSlice, createSelector } from '@reduxjs/toolkit';
import avatarDf from "../../assets/images/avatar_default.jpg";
import char0 from "../../assets/images/char.png"
import char1 from "../../assets/images/char.png"

const init = [
  { balance: 1000, prison:0 ,username:"player1",avatar:avatarDf,active:false,char:char0},
  { balance: 10, prison:0 ,username:"player2",avatar: avatarDf,active:false,char:char1},
  { balance: 1000, prison:0 ,username:"player3",avatar: avatarDf,active:false,char:char0},
  { balance: 1000, prison:0 ,username:"player4",avatar: avatarDf,active:false,char:char0},
] 

const userSlice = createSlice({
  name: 'user',
  initialState: init,
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
    },
    setActive: (state,action)=>{
      const {yourTurn} = action.payload
      state[yourTurn].active=true
      // state[yourTurn].active = !state[yourTurn].active
    },
    setUnActive:(state,action)=>{
      const {yourTurn} = action.payload
      state[yourTurn].active=false
    },
    resetUser:(state,action)=>{
      state= init
      console.log(state)
    }
  },
});

export const { updateBalance,secondaryUpdateBalance,updatePrison,setUsername,setBalance,setActive,setUnActive,resetUser } = userSlice.actions;

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

export default userSlice.reducer;
