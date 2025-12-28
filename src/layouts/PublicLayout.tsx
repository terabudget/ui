import React from "react";
import { Outlet } from "react-router";
import { PublicHeader } from "../components/PublicHeader";

const App: React.FC = () => {
  return (
    <div className="grid grid-cols-6 m-4">
      <div className="m-2 col-span-6">
        <PublicHeader />
      </div>
      <div className="col-span-6 ml-4 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
