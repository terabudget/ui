import React, { useEffect } from "react";

import { SignUpRequest } from "../../model/SignUpRequest";
import { ValidatedInputText } from "../../components/input/ValidatedInputText";
import { ValidatedPassword } from "../../components/input/ValidatedPassword";
import { Button } from "primereact/button";
import { useNavigate } from "react-router";
import { UsernameField } from "../../model/fields/authFields";
import { signUp } from "../../api/AuthApi";
import { useAuthContext } from "../../components/provider/AuthProvider";
import { lsUtil } from "../../util/localStorageUtil";

export const SignUp = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const { clearAuth, setTokens } = useAuthContext();
  const [validationErrors, setValidationErrors] = React.useState<
    string | undefined
  >();

  const nav = useNavigate();

  const doSignUp = async () => {
    clearAuth();
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

    lsUtil.setAuth(authResponse);
    setTokens(authResponse);
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
    <div className="flex grid grid-cols-1">
      <div className="col-span-1 flex m-auto p-4">
        <h1>Sign Up</h1>
      </div>

      <div className="col-span-1 m-auto p-4">
        <ValidatedInputText
          displayName="Username"
          id="username"
          onValueChange={setUsername}
          helpText="Enter a username."
          okText="Username is OK"
          zodString={UsernameField}
        />
      </div>

      <div className="col-span-1 m-auto p-4">
        <ValidatedPassword
          helpText="Enter a password."
          id="password"
          onValueChange={setPassword}
        />
      </div>

      <div className="col-span-1 m-auto p-4">
        <ValidatedPassword
          displayName="Confirm Password"
          helpText="Confirm your password."
          id="validate-password"
          okText=""
          onValueChange={setConfirmPassword}
        />
      </div>

      <div className="col-span-1 m-auto">
        {validationErrors && (
          <small className="p-error">{validationErrors}</small>
        )}
      </div>

      <div className="col-span-1 m-auto p-4">
        <div className="p-2 inline-block">
          <Button
            disabled={!enabled}
            className="p-button p-component"
            label="Sign up"
            onClick={doSignUp}
          />
        </div>
        <div className="p-2 inline-block">
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
  );
};
