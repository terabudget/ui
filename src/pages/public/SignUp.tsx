import React, { useEffect } from "react";

import { SignUpRequest } from "../../model/SignUpRequest";
import { ValidatedInputText } from "../../components/input/ValidatedInputText";
import { ValidatedPassword } from "../../components/input/ValidatedPassword";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { UsernameField } from "../../model/fields/authFields";
import { signUp } from "../../api/AuthApi";
import { setAuth } from "../../util/localStorageUtil";

export const SignUp = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [validationErrors, setValidationErrors] = React.useState<
    string | undefined
  >();

  const nav = useNavigate();

  const doSignUp = async () => {
    console.log("Doing sign up");
    const request = SignUpRequest.parse({
      username,
      password,
      confirmPassword,
    });

    const authResponse = await signUp(request);
    if (authResponse === null) {
      setValidationErrors("There was a problem signing you up");
      return;
    }

    if (authResponse?.error) {
      setValidationErrors(authResponse.error);
    }

    setAuth(authResponse);
    nav("/app");
  };

  useEffect(() => {
    const result = SignUpRequest.safeParse({
      username,
      password,
      confirmPassword,
    });
    setEnabled(result.success);

    if (result.success) {
      setValidationErrors(undefined);
    } else {
      const customIssues = result.error.issues
        .filter((issue) => issue.code === "custom")
        .map((issue) => issue.message);

      setValidationErrors(customIssues.join(", "));
    }
  }, [username, password, confirmPassword]);

  return (
    <>
      <div className="flex flex-grow align-items-center justify-content-center pt-6">
        <h2>Sign Up</h2>
      </div>

      <div className="align-items-center justify-content-center">
        <div className="formgrid grid align-items-center justify-content-center ">
          <ValidatedInputText
            displayName="Username"
            id="username"
            onValueChange={setUsername}
            helpText="Enter a username."
            okText="Username is OK"
            zodString={UsernameField}
          />
        </div>
      </div>

      <div className="flex flex-grow align-items-center justify-content-center pt-2">
        <ValidatedPassword
          helpText="Enter a password."
          id="password"
          onValueChange={setPassword}
        />
      </div>

      <div className="flex flex-grow align-items-center justify-content-center pt-2">
        <ValidatedPassword
          displayName="Confirm Password"
          helpText="Confirm your password."
          id="validate-password"
          okText=""
          onValueChange={setConfirmPassword}
        />
      </div>

      <div className="flex flex-grow align-items-center justify-content-center pt-2">
        {validationErrors && (
          <small className="p-error">{validationErrors}</small>
        )}
      </div>

      <div className="flex align-items-center justify-content-center">
        <div className="grid ">
          <div className="col flex flex-none">
            <div className="text-center p-3 border-round-sm font-bold">
              <Button
                disabled={!enabled}
                className="p-button p-component"
                label="Sign up"
                onClick={doSignUp}
              />
            </div>
          </div>
          <div className="col flex flex-none">
            <div className="text-center p-3 border-round-sm font-bold">
              <Button
                className="p-button p-component"
                severity="secondary"
                label="Cancel"
                text
                raised
                onClick={() => nav("/")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
