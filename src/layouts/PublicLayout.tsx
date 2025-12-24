import React from "react";
import { Outlet } from "react-router";
import { PublicHeader } from "../components/PublicHeader";

const App: React.FC = () => {
  return (
    <>
      <div>
        <div className="m-2">
          <PublicHeader />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default App;
