import { Container, Paper, Stack, Typography } from "@mui/material";

function App() {
  return (
    <Container>
      <Stack justifyContent="space-evenly" height="100vh">
        <Paper elevation={6} sx={{ padding: "5rem" }}>
          <Typography variant="h1" textAlign="center">
            Hello
          </Typography>
        </Paper>
      </Stack>
    </Container>
  );
}

export default App;
