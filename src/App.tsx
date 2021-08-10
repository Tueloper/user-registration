import "./App.css";
import React from "react";
import { Container, Paper } from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import RegistrationForm from "./components/RegistrationForm";

/**
 * Function for defining material UI styles
 *
 * @component
 * @example
 * const age = 21
 * const name = 'Jitendra Nirnejak'
 * return (
 *   <User age={age} name={name} />
 * )
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(6, "auto"),
    },
    paper: {
      padding: theme.spacing(6),
      [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(3),
      }
    },
  })
);

function App() {
  const classes = useStyles();
  const steps = [
    "User Details",
    "Password"
  ];

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <RegistrationForm steps={steps} />
      </Paper>
    </Container>
  );
}

export default App;
