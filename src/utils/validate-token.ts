import jwt from "jsonwebtoken";

export const validateToken = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decodedToken = jwt.decode(token);

    if (
      !decodedToken ||
      typeof decodedToken !== "object" ||
      !("exp" in decodedToken)
    ) {
      throw new Error("Invalid token");
    }

    const currentTime = Math.floor(Date.now() / 1000);

    return decodedToken.exp !== undefined && decodedToken.exp > currentTime;
  } catch (error) {
    return false;
  }
};