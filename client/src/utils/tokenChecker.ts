export function isTokenExpired(token: string): boolean {
  if (!token) return true;

  try {
    // Split the token and decode the payload (index 1)
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );

    // Get the exp property
    const { exp } = JSON.parse(jsonPayload);

    // exp is in seconds, Date.now() is in milliseconds
    const currentTime = Math.floor(Date.now() / 1000);

    return exp < currentTime;
  } catch (error) {
    // If decoding fails, treat the token as expired/invalid
    return true;
  }
}
