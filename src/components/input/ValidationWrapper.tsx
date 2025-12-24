import * as z from "zod";

import React, { useEffect, type ReactNode } from "react";

interface ValidationWrapperProps<T> {
  children: ReactNode | ReactNode[];
  enabled?: boolean;
  helpText?: string;
  inputId: string;
  onValueChange?: (isValid: boolean) => void;
  okText?: string;
  value: T;
  zodType: z.ZodType;
}

export function ValidationWrapper<T>({
  children,
  enabled,
  helpText,
  inputId,
  okText,
  value,
  zodType,
}: ValidationWrapperProps<T>) {
  const [newValue, setNewValue] = React.useState<T | undefined>(undefined);
  const [isEnabled, setIsEnabled] = React.useState<boolean>(false);

  const [validationErrors, setValidationErrors] = React.useState<
    string | undefined
  >();

  useEffect(() => {
    setIsEnabled(enabled === undefined ? false : enabled);
    setNewValue(value);
  }, [isEnabled, value]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }
    const result = zodType.safeParse(newValue);
    if (result.success) {
      setValidationErrors(undefined);
    } else {
      const flattened = z.flattenError(result.error);

      setValidationErrors(flattened.formErrors?.join(", "));
    }
  }, [newValue]);

  const showHelpText = !validationErrors && !newValue;
  const showOkText = !validationErrors && newValue;

  return (
    <div className="flex flex-column align-items-left flex-none">
      <div className="flex">{children}</div>
      <div className="flex max-w-16rem mt-2">
        <small id={`${inputId}-help`}>
          {showOkText && okText}
          {showHelpText && helpText}
          {validationErrors && (
            <span className="p-error">{validationErrors}</span>
          )}
        </small>
      </div>
    </div>
  );
}
