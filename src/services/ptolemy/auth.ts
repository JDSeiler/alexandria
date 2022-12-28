import { redirect } from "react-router-dom";
import ptolemy, { ErrorResponse } from "./base";

export type AccountDetails = {
  email: string;
  username: string;
  password: string;
};

export const checkAuthState = async () => {
  // TODO: Hook this up to my backend. I don't have the
  // necessary backend endpoint yet.
  const sessionIsValid = true;
  if (!sessionIsValid) {
    return redirect("/login");
  }
  return sessionIsValid;
};

/**
 * @param accountDetails the account to create
 * @returns resolves to null if account creation was successful, otherwise the
 * error response is returned
 */
export const createAccount = async (accountDetails: AccountDetails) => {
  const res = await ptolemy("/auth/create", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(accountDetails),
  });
  return res.ok ? null : ((await res.json()) as ErrorResponse);
};

/**
 * @param username
 * @param password
 * @returns resolves to null if login was successful, otherwise the
 * error response is returned
 */
export const login = async (username: string, password: string) => {
  const res = await ptolemy("/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ username, password }),
  });
  return res.ok ? null : ((await res.json()) as ErrorResponse);
};
