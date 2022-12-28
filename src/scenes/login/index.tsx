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
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { FC, useContext, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../hooks/auth";
import TextField from "../../components/forms/TextField";
import { login } from "../../services/ptolemy/auth";
import { useEffect } from "react";

type FormContents = {
  username: string;
  password: string;
};

const Login: FC = () => {
  const { signedIn, setSignedIn } = useContext(AuthContext);
  const [error, setError] = useState<{ title: string; body: string } | null>(
    null
  );
  const navigate = useNavigate();
  const { control, formState, handleSubmit } = useForm<FormContents>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const theme = useTheme();

  useEffect(() => {
    if (signedIn) {
      navigate("/");
    }
  }, [signedIn]);

  const onSubmit = async ({ username, password }: FormContents) => {
    const err = await login(username, password);
    if (!err) {
      setSignedIn(true);
    } else {
      if (err.kind === "UnverifiedEmail") {
        setError({
          title: "Your email address is not verified",
          body: "Check your inbox, you'll need to verify your email before you can sign in.",
        });
      } else if (err.kind === "InvalidCredentials") {
        setError({
          title: "Incorrect username or password",
          body: "The username or password you provided was not recognized, please try again.",
        });
      } else {
        console.error(err);
      }
    }
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
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={error !== null}
            autoHideDuration={5000}
            onClose={() => setError(null)}
            ClickAwayListenerProps={{ mouseEvent: false }}
          >
            <Alert
              severity="error"
              variant="filled"
              onClose={() => setError(null)}
            >
              <AlertTitle sx={{ fontSize: "1.125rem" }}>
                {error?.title}
              </AlertTitle>
              {error?.body}
            </Alert>
          </Snackbar>
        </Stack>
      </Stack>
    </form>
  );
};

export default Login;
