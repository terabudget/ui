import React from "react";
import { Outlet } from "react-router";
import { SecuredSidebar } from "../components/secured/SecuredSidebar";
import { BankAccountProvider } from "../components/provider/BankAccountProvider";
// import { useAuthContext } from "../components/provider/AuthProvider";

const App: React.FC = () => {
  //   const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex">
      {/* {isAuthenticated && ( */}
      <SecuredSidebar />
      <div className="flex-auto ml-2 p-4">
        <BankAccountProvider>
          <Outlet />
        </BankAccountProvider>
      </div>
      {/* )} */}
    </div>
  );
};

export default App;
