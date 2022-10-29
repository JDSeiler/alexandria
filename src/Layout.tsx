import { Box } from "@mui/material";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const Layout: FC = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Header />
      <Outlet />
    </Box>
  );
};

export default Layout;
