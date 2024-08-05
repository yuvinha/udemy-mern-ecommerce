import { useNavigate } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

const OrderStepper = ({ activeStep }) => {
  const navigate = useNavigate();

  const steps = [
    { label: "Shipping Address", url: "/shipping" },
    { label: "Payment Method", url: "/payment" },
    { label: "Place Order", url: "/placeorder" },
  ];

  const handleStep = (step) => () => navigate(steps[step].url);

  return (
    <Stepper nonLinear activeStep={activeStep} sx={{ my: 4, mb: 8 }}>
      {steps.map((step, index) => (
        <Step
          key={steps[index].label}
          completed={activeStep > index}
          disabled={activeStep < index}
        >
          <StepButton color="inherit" onClick={handleStep(index)}>
            {steps[index].label}
          </StepButton>
        </Step>
      ))}
      {/* <Step key={steps[0].label} completed={step > 0} disabled={step < 0}>
        <StepButton color="inherit" onClick={handleStep(0)}>
          {steps[0].label}
        </StepButton>
      </Step>
      <Step key={steps[1].label} completed={step > 1} disabled={step < 1}>
        <StepButton color="inherit" onClick={handleStep(1)}>
          {steps[1].label}
        </StepButton>
      </Step>
      <Step key={steps[2].label} completed={step > 2} disabled={step < 2}>
        <StepButton color="inherit" onClick={handleStep(2)}>
          {steps[2].label}
        </StepButton>
      </Step> */}
    </Stepper>
  );
};

export default OrderStepper;
