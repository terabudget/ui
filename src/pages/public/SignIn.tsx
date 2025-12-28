import React, { useEffect } from "react";
import { SignInRequest } from "../../model/SignInRequest";
import { ValidatedInputText } from "../../components/input/ValidatedInputText";
import { ValidatedPassword } from "../../components/input/ValidatedPassword";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { UsernameField } from "../../model/fields/authFields";
import { signIn } from "../../api/AuthApi";
import { setAuth } from "../../util/localStorageUtil";

export const SignIn = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [enabled, setEnabled] = React.useState<boolean>(false);
  const [validationErrors, setValidationErrors] = React.useState<
    string | undefined
  >();

  const nav = useNavigate();

  const doSignIn = async () => {
    const request = SignInRequest.parse({
      username,
      password,
    });

    const authResponse = await signIn(request);
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
    const result = SignInRequest.safeParse({
      username,
      password,
    });
    setEnabled(result.success);
  }, [username, password]);

  return (
    <div className="flex grid grid-cols-1">
      <div className="col-span-1 flex m-auto p-4">
        <h1>Sign In</h1>
      </div>
      <div className="col-span-1 m-auto p-4">
        <ValidatedInputText
          displayName="Username"
          helpText="Enter a username to log in."
          id="username"
          okText="Username is OK"
          onValueChange={setUsername}
          zodString={UsernameField}
        />
      </div>

      <div className="col-span-1 m-auto p-4">
        <ValidatedPassword
          helpText="Enter a password to log in."
          id="password"
          onValueChange={setPassword}
        />
      </div>

      <div className="col-span-1 m-auto">
        {validationErrors && (
          <small className="p-error">{validationErrors}</small>
        )}
      </div>

      <div className="col-span-1 m-auto">
        <div className="p-2 inline-block">
          <Button
            disabled={!enabled}
            className="p-button p-component"
            label="Sign In"
            onClick={doSignIn}
          />
        </div>
        <div className="p-2 inline-block">
          <Button
            className="p-button p-component"
            severity="secondary"
            text
            label="Sign Up"
            raised
            onClick={() => nav("/sign-up")}
          />
        </div>{" "}
      </div>
    </div>
  );
};
