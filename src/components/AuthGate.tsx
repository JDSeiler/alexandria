import { Typography } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/auth";

const AuthGate: FC = () => {
  const { loading, signedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !signedIn) {
      // navigation is a side-effect, so it goes in useEffect
      navigate("/login");
    }
  }, [signedIn]);

  if (loading) {
    return <Typography>{"AuthGate: Loading!"}</Typography>;
  }

  if (!loading && signedIn) {
    return <Outlet />;
  }

  return null;
};

export default AuthGate;
