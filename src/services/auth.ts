import { redirect } from "react-router-dom";

export const checkAuthState = async () => {
  // TODO: Hook this up to my backend.
  const sessionIsValid = true;
  if (!sessionIsValid) {
    return redirect("/login");
  }
  return sessionIsValid;
};
