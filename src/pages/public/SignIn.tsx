import React, { useEffect } from "react";
import { SignInRequest } from "../../model/SignInRequest";
import { ValidatedInputText } from "../../components/input/ValidatedInputText";
import { ValidatedPassword } from "../../components/input/ValidatedPassword";
import { useNavigate } from "react-router";
import { Button } from "primereact/button";
import { UsernameField } from "../../model/fields/authFields";
import { signIn } from "../../api/AuthApi";

export const SignIn = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [enabled, setEnabled] = React.useState<boolean>(false);

  const nav = useNavigate();

  const doSignIn = async () => {
    const request = SignInRequest.parse({
      username,
      password,
    });

    const authResponse = await signIn(request);
    console.log("RRR", authResponse);
  };

  useEffect(() => {
    const result = SignInRequest.safeParse({
      username,
      password,
    });
    setEnabled(result.success);
  }, [username, password]);

  return (
    <>
      <div className="flex flex-grow align-items-center justify-content-center pt-6">
        <h2>Sign In</h2>
      </div>
      <div className="align-items-center justify-content-center">
        <div className="formgrid grid align-items-center justify-content-center ">
          <ValidatedInputText
            displayName="Username"
            helpText="Enter a username to log in."
            id="username"
            okText="Username is OK"
            onValueChange={setUsername}
            zodString={UsernameField}
          />
        </div>
      </div>

      <div className="flex flex-grow align-items-center justify-content-center pt-2">
        <ValidatedPassword
          helpText="Enter a password to log in."
          id="password"
          onValueChange={setPassword}
        />
      </div>

      <div className="flex flex-grow align-items-center justify-content-center">
        <div className="grid">
          <div className="col flex flex-none">
            <div className="text-center p-3 border-round-sm font-bold">
              <Button
                disabled={!enabled}
                className="p-button p-component"
                label="Sign In"
                onClick={doSignIn}
              />
            </div>
          </div>
          <div className="col flex flex-none">
            <div className="text-center p-3 border-round-sm font-bold">
              <Button
                className="p-button p-component"
                severity="secondary"
                text
                label="Sign Up"
                raised
                onClick={() => nav("/signup")}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
