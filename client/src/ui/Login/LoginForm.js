import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import { login } from "../../state/ducks/user/operations";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  error: {
    color: "red",
    fontSize: "12px",
  },
  paper: {
    marginTop: theme.spacing(15),
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm({ login, user }) {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: values => {
      login(values.username, values.password);
      formik.resetForm();
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      {user.logged && <Redirect to="/home" />}
      <Paper className={classes.paper} elevation={2}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            value={formik.values.username}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            value={formik.values.password}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Grid container>
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
              Sign In
            </Button>

            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, { login })(LoginForm);
