export const setAuthToken = (response: any) => {
  sessionStorage.setItem('token', response.accessToken);
  sessionStorage.setItem('isLoggedIn', 'true');
  sessionStorage.setItem('username', response.userResponse.username);
  sessionStorage.setItem('userInfo', JSON.stringify(response.userResponse));
};

export const getAuthToken = () => {
  return sessionStorage.getItem('token');
};

export const clearAuthToken = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('userInfo');
  sessionStorage.setItem('isLoggedIn', 'false');
  sessionStorage.clear();
};
