import React from "react";
import { Outlet } from "react-router";
import { SecuredSidebar } from "../components/secured/SecuredSidebar";
// import { useAuthContext } from "../components/provider/AuthProvider";

const App: React.FC = () => {
  //   const { isAuthenticated } = useAuthContext();

  return (
    <div
      className="flex"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      {/* {isAuthenticated && ( */}
      <SecuredSidebar />
      <div className="flex-auto ml-2 p-4">
        <Outlet />
      </div>
      {/* )} */}
    </div>
  );
};

export default App;
