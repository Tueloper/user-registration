import React from "react";
import { Formik } from "formik";

import { UserSchema } from "./schemas";

import {
  Button,
  FormControl,
  FormHelperText,
  Box,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import TextField from "../CustomTextField";
import useStyles from "./styles";

interface Props {
  handleNext: () => void;
  handleBack: () => void;
  activeStep: number;
  isFinalStep: boolean;
}

function Form({
  handleNext,
  handleBack,
  activeStep,
  isFinalStep,
}: Props) {
  const classes = useStyles();
  return (
    <div>
      <Formik
        validateOnMount
        initialValues={{
          name: "",
          email: "",
          password: "",
          password2: "",
          termsAgreement: false,
        }}
        validationSchema={UserSchema}
        onSubmit={async (values) => {
          const { password2, ...data } = values;
          await fetch("https://qnfpyomao9.execute-api.us-east-2.amazonaws.com/default/register-users", {
            method: "POST",
            body: JSON.stringify(data),
          });
          // handle failure here
          handleNext();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          let disableNextButton: boolean = false;

          if (activeStep === 0) {
            disableNextButton = !!(
              errors.name ||
              errors.email
            );
          } else if (activeStep === 1) {
            disableNextButton = !!(
              errors.password ||
              errors.password2 ||
              errors.termsAgreement
            );
          }
          
          return (
            <Box>
              <form onSubmit={handleSubmit}>
                {activeStep === 0 && (
                  <Box>
                    <FormControl required className={classes.formControl}>
                      <TextField
                        name="name"
                        required
                        fullWidth
                        className={classes.formControl}
                        value={values.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="input-name"
                        label="Full name"
                        error={!!(touched.name && errors.name)}
                        helperText={
                          !!(touched.name && errors.name) ? errors.name : ""
                        }
                      />
                    </FormControl>
                    <FormControl required className={classes.formControl}>
                      <TextField
                        name="email"
                        required
                        fullWidth
                        className={classes.formControl}
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        id="input-email"
                        label="Email address"
                        error={!!(touched.email && errors.email)}
                        helperText={
                          !!(touched.email && errors.email) ? errors.email : ""
                        }
                      />
                    </FormControl>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      name="password"
                      required
                      fullWidth
                      className={classes.formControl}
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="input-password"
                      label="Password"
                      error={!!(touched.password && errors.password)}
                      helperText={
                        !!(touched.password && errors.password) ? errors.password : ""
                      }
                    />
                  </FormControl>
                  <FormControl required className={classes.formControl}>
                    <TextField
                      name="password2"
                      required
                      fullWidth
                      className={classes.formControl}
                      value={values.password2}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      id="input-password2"
                      label="Confirm pssword"
                      error={!!(touched.password2 && errors.password2)}
                      helperText={
                        !!(touched.password2 && errors.password2) ? errors.password2 : ""
                      }
                    />
                  </FormControl>
                  <FormControlLabel
                        className={classes.formControl}
                        control={
                          <Checkbox
                            checked={values.termsAgreement}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="termsAgreement"
                            color="primary"
                          />
                        }
                        label="I have read and agreed with the terms and conditions."
                      />
                      <FormHelperText
                        error={
                          !!(touched.termsAgreement && errors.termsAgreement)
                        }
                      >
                        {!!(touched.termsAgreement && errors.termsAgreement)
                          ? errors.termsAgreement
                          : ""}
                      </FormHelperText>
                </Box>
                )}
              </form>
              
              <Box mt={6}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  disabled={disableNextButton}
                  variant="contained"
                  color="primary"
                  onClick={() => (isFinalStep ? handleSubmit() : handleNext())}
                >
                  {isFinalStep ? "Create account" : "Next"}
                </Button>
              </Box>
            </Box>
          );
        }}
      </Formik>
    </div>
  );
}

export default Form;
