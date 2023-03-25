// TODO: Factor into env var. Perhaps use env-cmd
export const API_HOST = "http://localhost:4001";

// TODO: These types kinda suck.

export interface PtolemyInfo {
  message: string;
  details: string[];
}

export interface PtolemyOk {
  kind: "ok";
  info: PtolemyInfo;
}

export interface PtolemyError {
  kind: string;
  // Record<string, never> indicates an empty object
  details: Record<string, unknown> | Record<string, never>;
}

// credentials: 'include' is there because fetch, by default
// will only include credentials such as cookies when the request
// is going to the same origin. 

namespace ptolemy {
  export const r = (route: string, options?: RequestInit) => {
    return fetch(`${API_HOST}${route}`, options);
  }

  export const post = (route: string, body: unknown) => {
    return r(route, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(body)
    });
  }
}


export default ptolemy;
