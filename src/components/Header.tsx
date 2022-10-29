import { AppBar, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { styled } from "@mui/material";

// https://mui.com/material-ui/react-app-bar/
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const Header: FC = () => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography>{"SPACE TRAINS"}</Typography>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default Header;
