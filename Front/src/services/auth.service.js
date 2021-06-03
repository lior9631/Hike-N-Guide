import HttpService from './http.service';
import UserService from './user.service';

export default {
  login,
  signup,
  logout,
};
async function login(userCred) {
  const user = await HttpService.post('auth/login', userCred);
  return _handleLogin(user);
}
async function signup(userCred) {
  const user = await HttpService.post('auth/signup', userCred);
  return _handleLogin(user);
}
async function logout() {
  await HttpService.post('auth/logout');
  sessionStorage.clear();
}
function _handleLogin(user) {
  user = UserService.getMiniUserObj(user);
  sessionStorage.setItem('user', JSON.stringify(user));
  return user;
}
