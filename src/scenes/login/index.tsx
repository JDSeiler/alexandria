import Lock from "@mui/icons-material/Lock";
import PersonOutline from "@mui/icons-material/PersonOutline";
import {
  Button,
  CircularProgress,
  InputAdornment,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FC, useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/auth";
import TextField from "../../components/forms/TextField";

type FormContents = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const { setSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm<FormContents>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const theme = useTheme();

  const onSubmit = (formContents: FormContents) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // TODO: Do real sign-in implementation. The basic idea will stay the same.
        // Redirection to "/" is not working as expected, but I wont bother trying
        // to fix it unless it breaks in a real implementation.
        console.log(JSON.stringify(formContents, null, 2));
        setSignedIn(true);
        resolve(true);
        navigate("/");
      }, 1500);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: "15vh" }}>
        <Typography variant="h4" sx={{ paddingBottom: "1rem" }}>
          Sign In
        </Typography>
        <TextField
          name="username"
          control={control}
          id="username"
          label="Username"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutline />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="password"
          control={control}
          id="password"
          label="Password"
          type="password"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Link
            component={ReactRouterLink}
            to="/create-account"
            sx={{
              marginTop: "0.45rem",
            }}
            tabIndex={0}
          >
            Create Account
          </Link>
          <Button
            variant="contained"
            type="submit"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <CircularProgress
                size={24}
                sx={{
                  color: theme.palette.secondary.main,
                }}
              />
            ) : (
              "Sign In"
            )}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default Login;
