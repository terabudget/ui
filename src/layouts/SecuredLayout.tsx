import React from "react";
import { Outlet } from "react-router";
import { SecuredHeader } from "../components/SecuredHeader";

const App: React.FC = () => {
  return (
    <>
      <div className="m-2">
        <SecuredHeader />
      </div>
      <Outlet />
    </>
  );
};

export default App;
