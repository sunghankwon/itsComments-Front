function getTokenFromCookie() {
  const cookies = document.cookie.split(";");
  const authTokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("authToken="),
  );

  return authTokenCookie
    ? authTokenCookie.trim().substring("authToken=".length)
    : null;
}

export default getTokenFromCookie;
