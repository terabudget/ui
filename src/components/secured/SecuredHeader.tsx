import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import type { MenuItem } from "primereact/menuitem";

export const SecuredHeader = () => {
  const items: MenuItem[] = [
    {
      label: "Accounts",
      icon: "pi pi-home",
    },
    {
      label: "Planning",
      icon: "pi pi-star",
    },
    {
      label: "Reports",
      icon: "pi pi-search",
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
};
