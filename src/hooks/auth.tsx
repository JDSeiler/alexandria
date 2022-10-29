import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

const useAuthState = () => {
  const [signedIn, setSignedInInternal] = useState(false);
  const [loading, setLoadingInternal] = useState(true);

  useEffect(() => {
    // TODO: Simulate checking if the user is signed in.
    setTimeout(() => {
      setSignedInInternal(false);
      setLoadingInternal(false);
    }, 1500);
  }, []);

  // Dinky little wrappers so that I don't have to deal with the
  // types: React.Dispatch<React.SetState ... yadda yadda
  const setSignedIn = (newValue: boolean) => {
    setSignedInInternal(newValue);
  };

  const setLoading = (newValue: boolean) => {
    setLoadingInternal(newValue);
  };

  return {
    signedIn,
    setSignedIn,
    loading,
    setLoading,
  };
};

// We only export the AuthContext so that the state is shared globally.
// The default values are only passed to components if they don't have a provider.
export const AuthContext = createContext({
  signedIn: false,
  setSignedIn: (_: boolean) => {
    void "intentionally unimplemented";
  },
  loading: false,
  setLoading: (_: boolean) => {
    void "intentionally unimplemented";
  },
});

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const authState = useAuthState();
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};
