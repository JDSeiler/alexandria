import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

const useAuthState = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Simulate checking if the user is signed in.
    setTimeout(() => {
      setSignedIn(true);
      setLoading(false);
    }, 1500);
  }, []);

  // TODO: I think I need to return a function to call the login endpoint and set the sign-in state?
  return {
    signedIn,
    loading,
  };
};

// We only export the AuthContext so that the state is shared globally.
export const AuthContext = createContext({
  signedIn: false,
  loading: true,
});

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const authState = useAuthState();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
