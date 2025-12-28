import React from "react";
import { Outlet } from "react-router";
import { SecuredSidebar } from "../components/secured/SecuredSidebar";

const App: React.FC = () => {
  return (
    <div className="flex">
      <SecuredSidebar />
      <div className="flex-auto ml-2 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
