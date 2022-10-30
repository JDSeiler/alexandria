import Lock from "@mui/icons-material/Lock";
import PersonOutline from "@mui/icons-material/PersonOutline";
import {
  Button,
  CircularProgress,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { FC, useContext } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from "../../hooks/auth";

const loginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login: FC = () => {
  const { setSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        // TODO: Do real sign-in implementation. The basic idea will stay the same.
        alert("Woohoo! Signed in!");
        setSubmitting(false);
        setSignedIn(true);
        navigate("/");
      }, 500);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2} alignItems="center" sx={{ marginTop: "15vh" }}>
        <Typography variant="h4" sx={{ paddingBottom: "1rem" }}>
          Sign In
        </Typography>
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
        />
        <TextField
          name="password"
          type="password"
          label="Password"
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
              "Sign In"
            )}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default Login;
