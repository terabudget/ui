import React, { useEffect } from "react";
import { PasswordField } from "../../model/fields/authFields";
import { Password } from "primereact/password";
import { ValidationWrapper } from "./ValidationWrapper";

interface ValidatedPasswordProps {
  displayName?: string;
  helpText?: string;
  id: string;
  okText?: string;
  onValueChange?: (password: string) => void;
  value?: string;
}

export const ValidatedPassword = ({
  displayName,
  helpText,
  id,
  okText,
  onValueChange,
  value,
}: ValidatedPasswordProps) => {
  const [isValid, setIsValid] = React.useState<boolean>(false);
  const [isValidationEnabled, setIsValidationEnabled] =
    React.useState<boolean>(false);
  const [newValue, setNewValue] = React.useState<String>("");

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
          zodType={PasswordField}
          okText={okText == undefined ? "Password is OK" : okText}
          onValueChange={setIsValid}
          value={newValue}
        >
          <Password
            aria-describedby={`${id}-help`}
            feedback={true}
            id={id}
            invalid={!!isValid}
            onBlur={enableValidation}
            onChange={handleChange}
            placeholder={displayName ?? "Password"}
          />
        </ValidationWrapper>
      </div>
    </div>
  );
};
