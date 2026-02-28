import { Menu } from "primereact/menu";

import "./SecuredSidebar.css";
import { LogoText } from "../LogoText";
import { Link, useLocation, useNavigate } from "react-router";
import { SidebarItem } from "./SidebarItem";
import type { SidebarItemType } from "./SidebarItem";
import { useEffect, useState } from "react";

export const SecuredSidebar = () => {
  const [activeItem, setActiveItem] = useState<string | undefined>();
  const nav = useNavigate();
  const location = useLocation();

  const headerRenderer = () => (
    <div className="sidebar-logo">
      <Link to={"/app"}>
        <LogoText className="flex-auto px-4 py-2" />
      </Link>
    </div>
  );

  const itemRenderer = (item: SidebarItemType) => <SidebarItem item={item} />;

  useEffect(() => {
    const lowercasePathName = location.pathname.toLowerCase();

    switch (lowercasePathName) {
      case "/app":
        setActiveItem("dashboard");
        break;
      case "/app/accounts":
      case "/app/categories":
      case "/app/planner":
      case "/app/reports":
      case "/app/settings":
      case "/app/transactions":
        setActiveItem(lowercasePathName.split("/")[2]);
        break;
      default:
        setActiveItem(undefined);
    }
  }, [location]);

  let items: SidebarItemType[] = [
    {
      template: headerRenderer,
    },
    {
      separator: true,
    },
    {
      label: "Budget",

      items: [
        {
          command: () => nav("/app/accounts"),
          icon: "pi pi-plus",
          isActive: activeItem === "accounts",
          label: "Accounts",
          template: itemRenderer,
        },
        {
          command: () => nav("/app/categories"),
          icon: "pi pi-plus",
          isActive: activeItem === "categories",
          label: "Categories",
          template: itemRenderer,
        },
      ],
    },
    {
      separator: true,
    },
  ];

  return <Menu model={items} className="secured-sidebar" />;
};
