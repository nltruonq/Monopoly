import { createSlice, createSelector } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: [
    { balance: 500 },
    { balance: 500 },
    { balance: 500 },
    { balance: 500 },
  ],
  reducers: {
    updateBalance: (state, action) => {
      const { turnOfUser, amount } = action.payload;
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
  },
});

export const { updateBalance,secondaryUpdateBalance } = userSlice.actions;

export const selectUser = createSelector(
  (state) => state.user,
  (user) => user
);

export default userSlice.reducer;
