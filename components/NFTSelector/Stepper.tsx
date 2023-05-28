import React from "react";
import type { StepperProps } from "./types";

export const Stepper: React.FC<StepperProps> = ({ currentStep = 1, steps }) => {
  return (
    <div className="max-w-lg w-full mb-12 flex items-center">
      {[...new Array(steps)].map((_, index) => {
        const step = index + 1;
        const highlight = step <= currentStep;
        return (
          <React.Fragment key={`{step${index}}`}>
            <div
              className={`rounded-full h-4 w-4 border-2 ${
                highlight ? "border-violet" : "border-gray-300"
              } ${highlight ? "bg-violet" : ""}`}
            />
            {step !== steps && (
              <div
                className={`flex-auto border-t-2 ${
                  currentStep > step ? "border-violet" : "border-gray-300"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
