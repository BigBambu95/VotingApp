export const getUserPolls = (state, author) => state.pollList.polls.filter(item => item.author === author);
export const getUsername = (state) => state.user.username;
export const getIsAuth = (state) => state.user.isAuth;