import { createSlice } from "@reduxjs/toolkit";


export const authAction = createSlice({
  name: 'user',
  initialState:{
    islog:false,
    user:{}
  },
  reducers:{
    login: (state, action)=>{
      state.islog = action.payload.islog;
      state.user = action.payload.user;
    },
    logout:(state)=>{
      state.islog = false;
      state.user = {}
    }
  }
})

export const {login, logout} = authAction.actions;
export default authAction.reducer
