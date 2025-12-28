import { Menubar } from "primereact/menubar";

import "./PublicHeader.css";
import { LogoText } from "./LogoText";

export const PublicHeader = () => {
  const start = (
    <div className="grid grid-cols-12">
      <div className="m-2 col-span-1">
        <img
          alt="logo"
          src="https://primefaces.org/cdn/primereact/images/logo.png"
          className="budget-header-logo"
        ></img>
      </div>
      <div className="m-2 col-span-11">
        <LogoText />
      </div>
    </div>
  );

  return (
    <div className="card flex">
      <Menubar start={start} className="grow" />
    </div>
  );
};
