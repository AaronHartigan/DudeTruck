function isLoggedIn(user) {
  const expires = user && user.exp;
  if (typeof expires !== 'number') {
    return false;
  }
  return new Date().getTime() / 1000 < expires;
}

export default isLoggedIn;
