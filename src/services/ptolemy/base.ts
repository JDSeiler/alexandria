// TODO: Factor this out into an env variable.
// Perhaps use env-cmd like I have previously.
export const API_HOST = "http://localhost:4001";

// These types are very loose because Ptolemy's API surface is not stabilized
// yet, so more narrow types would quickly become outdated and irritating.
// I can revisit this issue later.

export type InfoResponse = {
  message: string;
  details: string[];
};

export type ErrorResponse = {
  kind: string;
  details: Record<string, unknown> | Record<string, never>;
};

const ptolemy = (apiRoute: string, options?: RequestInit) => {
  return fetch(`${API_HOST}${apiRoute}`, options);
};

export default ptolemy;
