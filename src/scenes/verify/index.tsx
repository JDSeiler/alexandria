import { LinearProgress, Typography, Link } from "@mui/material";
import { Link as ReactRouterLink } from "react-router-dom";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../services/ptolemy/auth";

/*
TODO:
This component is kinda broken in development mode (when StrictMode is on)
but *should* work fine in production.

Strict mode deliberately renders components twice. My verification endpoint is
not idempotent so this causes problems. The first request works just fine, but
then the second request fails (as it should, codes are one-time use) and all of
this happens so fast that it looks like the whole operation failed.

In reality it succeeds and then fails in rapid succession. Giving the appearance
of failure. This double rendering is not turned on in production, so it shouldn't
be a problem there.

Ideally, I'd find some workaround for this, but it's a tricky thing to solve
and is time consuming to test, so I'm just going to leave it for now. The whole
thing works well enough that I can make test accounts without too much trouble.

The React beta docs address this some: https://beta.reactjs.org/learn/synchronizing-with-effects#not-an-effect-initializing-the-application
I tried implementing some of their suggestions without much success.
*/

type RequestState = "loading" | "success" | "failed";

const VerifyEmail: FC = () => {
  const [searchParams] = useSearchParams();
  const [requestState, setRequestState] = useState<RequestState>("loading");

  useEffect(() => {
    let ignore = false;

    const attemptVerification = async () => {
      const email = searchParams.get("email");
      const code = searchParams.get("code");

      if (email === null || code === null) {
        setRequestState("failed");
      } else {
        console.log("Sending request");
        const res = await verifyEmail(email, code);

        if (ignore) {
          console.log("Ignoring");
          return;
        }
        console.log("Not ignoring");

        if (res.ok) {
          setRequestState("success");
        } else {
          console.error(res);
          setRequestState("failed");
        }
      }
    };

    attemptVerification();

    return () => {
      ignore = true;
    };
  }, []);

  if (requestState === "loading") {
    return <LinearProgress />;
  } else if (requestState === "failed") {
    return (
      <Typography variant="h5" sx={{ margin: "1rem" }}>
        Email verification failed
      </Typography>
    );
  } else {
    return (
      <Typography variant="h5" sx={{ margin: "1rem" }}>
        Email successfully verified! You can now sign in
        <Link component={ReactRouterLink} to="/login" tabIndex={0}>
          {" here"}
        </Link>
      </Typography>
    );
  }
};

export default VerifyEmail;
