import React from "react";
import { Outlet } from "react-router";
import { SecuredSidebar } from "../components/secured/SecuredSidebar";
import { BankAccountProvider } from "../components/provider/BankAccountProvider";
import { LogoText } from "../components/LogoText";
// import { useAuthContext } from "../components/provider/AuthProvider";

const App: React.FC = () => {
  //   const { isAuthenticated } = useAuthContext();

  return (
    <div className="flex">
      {/* {isAuthenticated && ( */}
      <div className="flex-none pt-0">
        <div className="grid grid-cols-1 gap-8">
          <div className="h-12">
            <LogoText className="flex-auto px-4 py-2" />
          </div>
          <div >
            <SecuredSidebar />
          </div>
        </div>
      </div>
      <div className="flex-auto p-4 pt-0">
        <BankAccountProvider>
          <Outlet />
        </BankAccountProvider>
      </div>
      {/* )} */}
    </div>
  );
};

export default App;
