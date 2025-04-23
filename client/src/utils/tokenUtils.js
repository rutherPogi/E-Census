export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Date.now() / 1000; // Current time in seconds
    return payload.exp < now;
  } catch (error) {
    console.error("Invalid token format", error);
    return true;  // Treat invalid tokens as expired
  }
};
