import React from "react";

import {
  Step,
  StepLabel,
  Typography,
  Button,
  Stepper as MuiStepper,
  Box,
} from "@material-ui/core";

import useStyles from "./styles";
import Form from './Form';

function RegistrationForm(props: any) {
  const classes = useStyles();
  let { steps } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const isFinalStep = activeStep === steps.length - 1;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <MuiStepper activeStep={activeStep} alternativeLabel>
        {steps.map((label: string) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              Your Account Has Been Created Successfully!
            </Typography>
            <Box mt={4} textAlign="center">
              <Button onClick={handleReset}>ADD NEW ACCOUNT</Button>
            </Box>
          </div>
        ) : (
          <Form
            activeStep={activeStep}
            isFinalStep={isFinalStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}

export default RegistrationForm;
