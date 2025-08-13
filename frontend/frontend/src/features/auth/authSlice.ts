import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number | null;
  nickname: string | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: null,
  nickname: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ id: number; nickname: string }>) {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.id = null;
      state.nickname = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
