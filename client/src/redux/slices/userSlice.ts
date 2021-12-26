import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
export interface User {
  username?: string;
  displayName?: string;
  email?: string;
  bio?: string;
  id?: string;
  pk?: number;
  photo?: string;
  followersCount?: number;
  followingCount?: number;
  isAuthenticated?: boolean;
  verified?: boolean;
  isSelf?: boolean;
  isFollowed?: boolean;
  isFollowing?: boolean;
  private?: boolean;
  isRequested?: boolean;
}
interface State {
  user: User;
}
const initialState: User = {
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: initialState,
  },
  reducers: {
    setUser: (state: Draft<State>, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload, isAuthenticated: true };
    },
    resetUser: (state: Draft<State>) => {
      state.user = { isAuthenticated: false };
    },
  },
});

// Selectors
export const getUser: (state: any) => User = (state: any) => state.user.user;

// Reducers and actions
export const { setUser, resetUser } = userSlice.actions;
export default userSlice.reducer;
