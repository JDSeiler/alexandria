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
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";

const createAccoutSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
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

const CreateAccount: FC = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: createAccoutSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        setShowSuccessFeedback(true);
        setSubmitting(false);
        resetForm();
      }, 500);
    },
  });
  const theme = useTheme();
  // Preemptively adding this for when the API spits back an error that
  // a username/email is already in use.
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ marginTop: "15vh", width: "auto" }}
      >
        <Typography variant="h4" sx={{ paddingBottom: "1rem" }}>
          Create an Account
        </Typography>
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          required
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
          id="username"
          name="username"
          label="Username"
          required
          value={formik.values.username}
          onChange={formik.handleChange}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
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
          id="password"
          name="password"
          label="Password"
          type="password"
          required
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
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
        {errorMessage.length > 0 && (
          <Typography color="error">{`Error: ${errorMessage}`}</Typography>
        )}
        <Button
          variant="contained"
          disabled={formik.isSubmitting}
          onClick={formik.submitForm}
        >
          {formik.isSubmitting ? (
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
          onClose={() => setShowSuccessFeedback(false)}
        >
          <Alert
            severity="info"
            variant="filled"
            onClose={() => setShowSuccessFeedback(false)}
          >
            <AlertTitle>Additional Action Needed</AlertTitle>
            Please confirm your email address to complete account setup.
          </Alert>
        </Snackbar>
      </Stack>
    </form>
  );
};

export default CreateAccount;
