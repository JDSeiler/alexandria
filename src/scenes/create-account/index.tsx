import CheckIcon from "@mui/icons-material/Check";
import EmailIcon from "@mui/icons-material/Email";
import Lock from "@mui/icons-material/Lock";
import PersonOutline from "@mui/icons-material/PersonOutline";
import {
  Alert,
  AlertTitle,
  Button,
  CircularProgress,
  InputAdornment,
  Snackbar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "../../components/forms/TextField";
import { createAccount } from "../../services/ptolemy/auth";

const createAccountSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .test({
      name: "passwords-match",
      message: "Passwords do not match",
      test: function (value) {
        return value === this.parent.password;
      },
    }),
});

type FormContents = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const CreateAccount: FC = () => {
  const theme = useTheme();
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { control, formState, handleSubmit, reset } = useForm<FormContents>({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
    resolver: yupResolver(createAccountSchema),
  });

  const onSubmit = useCallback(
    async ({ email, username, password }: FormContents) => {
      // Ultimately, I will need to read the API response and set the form's
      // error state accordingly. The main case for this is if an email/username
      // is already in use.
      const err = await createAccount({ email, username, password });
      if (!err) {
        setShowSuccessFeedback(true);
        reset();
      } else {
        if (err.kind === "DuplicateFields") {
          setShowErrorMessage(true);
        } else {
          console.error(err);
        }
      }
    },
    [setShowSuccessFeedback]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "15vh", width: "auto" }}
      >
        <Typography variant="h4" sx={{ paddingBottom: "1rem" }}>
          Create an Account
        </Typography>
        <TextField
          name="email"
          control={control}
          id="email"
          label="Email"
          type="email"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ maxWidth: "50ch" }}
        />
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
          fullWidth
          sx={{ maxWidth: "50ch" }}
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
          fullWidth
          sx={{ maxWidth: "50ch" }}
        />
        <TextField
          name="confirmPassword"
          control={control}
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CheckIcon />
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ maxWidth: "50ch" }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={formState.isSubmitting || !formState.isValid}
        >
          {formState.isSubmitting ? (
            <CircularProgress
              size={24}
              sx={{
                color: theme.palette.secondary.main,
              }}
            />
          ) : (
            "Create Account"
          )}
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={showSuccessFeedback}
          // Disables the click away functionality to make it harder to
          // accidentally dismiss the snackbar. The snackbar can still be
          // closed with the "X" icon of the `Alert` component.
          ClickAwayListenerProps={{ mouseEvent: false }}
        >
          <Alert
            severity="info"
            icon={<EmailIcon />}
            variant="filled"
            onClose={() => setShowSuccessFeedback(false)}
          >
            <AlertTitle sx={{ fontSize: "1.125rem" }}>
              Check your inbox!
            </AlertTitle>
            You&apos;ll need to confirm your email address before you can sign
            in.
          </Alert>
        </Snackbar>

        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={showErrorMessage}
          // Disables the click away functionality to make it harder to
          // accidentally dismiss the snackbar. The snackbar can still be
          // closed with the "X" icon of the `Alert` component.
          ClickAwayListenerProps={{ mouseEvent: false }}
        >
          <Alert
            severity="error"
            variant="filled"
            onClose={() => setShowSuccessFeedback(false)}
          >
            <AlertTitle sx={{ fontSize: "1.125rem" }}>
              Cannot create account
            </AlertTitle>
            An account with that username or email address already exists! Try a
            different username or email.
          </Alert>
        </Snackbar>
      </Stack>
    </form>
  );
};

export default CreateAccount;
