import React from "react";

import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";
import { useFormik } from "formik";
import { register } from "../../state/ducks/user/operations";

const useStyles = makeStyles(theme => ({
  error: {
    color: "red",
    fontSize: "12px",
  },
  paper: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function RegisterForm({ register, user }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: values => {
      register(values.username, values.password);
      formik.resetForm();
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      {user.logged && <Redirect to="/home" />}
      <Paper className={classes.paper} elevation={2}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                value={formik.values.username}
                onChange={formik.handleChange}
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                onChange={formik.handleChange}
                required
                fullWidth
                value={formik.values.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <div className={classes.error}>{user.error}</div>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default connect(null, { register })(RegisterForm);
