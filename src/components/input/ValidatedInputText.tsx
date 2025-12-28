import * as z from "zod";

import { InputText } from "primereact/inputtext";
import React, { useEffect } from "react";
import { ValidationWrapper } from "./ValidationWrapper";

interface ValidatedInputTextProps {
  displayName: string;
  helpText?: string;
  id: string;
  okText?: string;
  onValueChange?: (username: string) => void;
  value?: string;
  zodString: z.ZodString;
}

export const ValidatedInputText = ({
  displayName,
  helpText,
  id,
  okText,
  onValueChange,
  value,
  zodString,
}: ValidatedInputTextProps) => {
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [isValidationEnabled, setIsValidationEnabled] =
    React.useState<boolean>(false);
  const [newValue, setNewValue] = React.useState<string>("");

  const enableValidation = () => setIsValidationEnabled(true);

  useEffect(() => {
    setNewValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
    enableValidation();
    onValueChange && onValueChange(e.target.value);
  };

  return (
    <div className="flex flex-column align-items-left flex-none field">
      <div className="flex">
        <ValidationWrapper
          enabled={isValidationEnabled}
          helpText={helpText}
          inputId={id}
          zodType={zodString}
          okText={okText}
          onValueChange={setIsValid}
          value={newValue}
        >
          <InputText
            aria-describedby={`${id}-help`}
            id={id}
            invalid={!!isValid}
            onChange={handleChange}
            onBlur={enableValidation}
            placeholder={displayName}
            value={newValue}
          />
        </ValidationWrapper>
      </div>
    </div>
  );
};
