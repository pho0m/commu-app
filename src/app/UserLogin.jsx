import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  Avatar,
  Link,
} from "@material-ui/core";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { useNavigate } from "react-router";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright TCT-R31 © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function UserLogin(props) {
  let navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            border: "1px solid rgba(0, 0, 0, 0.25)",
            padding: "5vh",
            margin: "10px",
          }}
        >
          <Typography component="h1" variant="h4">
            Welcome to Commu App
          </Typography>
          <Box
            component="form"
            // onSubmit={}
            noValidate
            sx={{ mt: 10 }}
          >
            {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button> */}
            {/* <br />
            <br /> */}

            {/* <Grid container>
              <Grid item>
                <Button
                  style={{ color: "blue" }}
                  onClick={() => {
                    navigate(`/user/register`);
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid> */}
          </Box>
          <br />
          <GoogleLoginButton
            iconSize="20px"
            style={{ fontSize: "15px" }}
            align="center"
            onClick={props.loginGoogle}
          />
          <FacebookLoginButton
            iconSize="20px"
            style={{ fontSize: "15px" }}
            align="center"
            onClick={props.loginFB}
          />
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
