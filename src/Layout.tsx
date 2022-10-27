import { FC } from "react";
import { Container, Paper, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./hooks/auth";

const Layout: FC = () => {
  // TODO: This is just a proof of concept. I don't really want everything placed
  // on a floating card...
  return (
    <AuthProvider>
      <Container>
        <Stack justifyContent="space-evenly" height="100vh">
          <Paper elevation={6} sx={{ padding: "5rem" }}>
            <Outlet />
          </Paper>
        </Stack>
      </Container>
    </AuthProvider>
  );
};

export default Layout;
