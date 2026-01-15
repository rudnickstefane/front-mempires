import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";

export interface SteppersWithFormsProps {
  titleSteps: string[];
  activeStep: number;
  width?: string;
  onStepClick?: (step: number) => void;
}

export function SteppersWithForms(props: Readonly<SteppersWithFormsProps>) {
  const { activeStep, titleSteps, width = "200px", onStepClick } = props;

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      style={{ minWidth: width, marginRight: "24px" }}
      connector={null}
      sx={{
        "& .MuiStepLabel-iconContainer": {
          display: "none",
        },

        /* base */
        "& .MuiStepLabel-label": {
          display: "block",
          width: "100%",
          borderRadius: "8px",
          padding: "1rem",
          fontSize: "0.975rem",
          fontFamily: "Poppins",
        },

        /* ATIVO */
        "& .MuiStepLabel-label.Mui-active": {
          backgroundColor: "#F3F3F4",
          color: "#282929",
          fontWeight: 500,
        },

        /* COMPLETED */
        "& .MuiStepLabel-label.Mui-completed": {
          color: "#282929",
          fontWeight: 400,
        },

        /* DISABLED (próximo) */
        "& .MuiStepLabel-label.Mui-disabled": {
          color: "#A3A4A5",
        },
      }}
    >
      {titleSteps.map((value, index) => {
        const isDisabled = index > activeStep;

        return (
          <Step key={`${value}-${index}`} disabled={isDisabled}>
            <StepLabel
              className={`${!isDisabled ? "cursor-pointer" : ""}`}
              onClick={() => {
                if (!isDisabled) onStepClick?.(index);
              }}
            >
              {value}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
