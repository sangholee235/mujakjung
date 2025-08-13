import type { RootState } from "../../app/store";

export const selectUserId = (state: RootState) => state.auth.id;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectNickname = (state: RootState) => state.auth.nickname;
