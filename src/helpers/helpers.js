export const headersWithAccessToken = (headers, accessToken) => {
  headers["access-token"] = `bearer ${accessToken}`;
  return headers;
};
