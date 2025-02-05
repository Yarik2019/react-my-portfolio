export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUser = (state) => state.user.user;
export const selectIsRefreshing = (state) => state.user.isRefreshing;
export const selectAccesToken = (state) => state.user.token;
export const selectAllUsersCount = (state) => state.user.usersCount;
