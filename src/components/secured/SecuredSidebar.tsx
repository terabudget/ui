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
          command: () => nav("/app/categories"),
          icon: "pi pi-plus",
          isActive: activeItem === "categories",
          label: "Categories",
          template: itemRenderer,
        },
        {
          command: () => nav("/app/planner"),
          icon: "pi pi-search",
          isActive: activeItem === "planner",
          label: "Planner",
          template: itemRenderer,
        },
      ] as SidebarItemType[],
    },
    {
      separator: true,
    },
    {
      label: "Analysis",
      items: [
        {
          command: () => nav("/app"),
          icon: "pi pi-plus",
          isActive: activeItem === "dashboard",
          label: "Dashboard",
          template: itemRenderer,
        },
        {
          command: () => nav("/app/accounts"),
          icon: "pi pi-plus",
          isActive: activeItem === "accounts",
          label: "Accounts",
          template: itemRenderer,
        },
        {
          command: () => nav("/app/transactions"),
          icon: "pi pi-search",
          isActive: activeItem === "transactions",
          label: "Transactions",
          template: itemRenderer,
        },
        {
          command: () => nav("/app/reports"),
          icon: "pi pi-search",
          label: "Reports",
          isActive: activeItem === "reports",
          template: itemRenderer,
        },
      ] as SidebarItemType[],
    },
    {
      separator: true,
    },

    {
      label: "Profile",
      items: [
        {
          command: () => nav("/app/settings"),
          label: "Settings",
          icon: "pi pi-cog",
          isActive: activeItem === "settings",
          shortcut: "⌘+O",
          template: itemRenderer,
        },
        {
          label: "Sign Out",
          icon: "pi pi-sign-out",
          command: () => nav("/sign-out"),
          template: itemRenderer,
        },
      ] as SidebarItemType[],
    },
  ];

  return <Menu model={items} className="secured-sidebar" />;
};
