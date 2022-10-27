import {
  Typography,
  InputAdornment,
  TextField,
  Stack,
  Button,
  Link,
} from "@mui/material";
import PersonOutline from "@mui/icons-material/PersonOutline";
import Lock from "@mui/icons-material/Lock";
import { FC } from "react";
import { Link as ReactRouterLink } from "react-router-dom";

const Login: FC = () => {
  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h4" sx={{ paddingBottom: "1rem" }}>
        Sign In
      </Typography>
      <TextField
        required
        label="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonOutline />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: "33%" }}
      />
      <TextField
        required
        label="Password"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: "33%" }}
      />
      <Stack direction="row" spacing={3} justifyContent="space-between">
        <Link
          component={ReactRouterLink}
          to="/create-account"
          sx={{ marginTop: "0.45rem" }}
        >
          Create Account
        </Link>
        <Button variant="contained">Sign In</Button>
      </Stack>
    </Stack>
  );
};

export default Login;
