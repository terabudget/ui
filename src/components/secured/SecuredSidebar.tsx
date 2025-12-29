import { Menu } from "primereact/menu";
import type { MenuItem } from "primereact/menuitem";

import "./SecuredSidebar.css";
import { LogoText } from "../LogoText";
import { Link, useNavigate } from "react-router";
import { SidebarItem } from "./SidebarItem";

export const SecuredSidebar = () => {
  const nav = useNavigate();

  const headerRenderer = () => (
    <Link to={"/app"}>
      <LogoText className="flex-auto px-4 py-2" />
    </Link>
  );

  const itemRenderer = (item: MenuItem) => <SidebarItem item={item} />;

  let items: MenuItem[] = [
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
          label: "Categories",
          icon: "pi pi-plus",
          template: itemRenderer,
          command: () => nav("/app/categories"),
        },
        {
          label: "Planner",
          icon: "pi pi-search",
          template: itemRenderer,
        },
      ] as MenuItem[],
    },
    {
      separator: true,
    },
    {
      label: "Analysis",

      items: [
        {
          label: "Accounts",
          icon: "pi pi-plus",
          template: itemRenderer,
        },
        {
          label: "Transactions",
          icon: "pi pi-search",
          template: itemRenderer,
        },
        {
          label: "Reports",
          icon: "pi pi-search",
          template: itemRenderer,
        },
      ] as MenuItem[],
    },
    {
      separator: true,
    },

    {
      label: "Profile",
      items: [
        {
          label: "Settings",
          icon: "pi pi-cog",
          shortcut: "⌘+O",
          template: itemRenderer,
        },
        {
          label: "Sign Out",
          icon: "pi pi-sign-out",
          command: () => nav("/sign-out"),
          template: itemRenderer,
        },
      ] as MenuItem[],
    },
  ];

  return <Menu model={items} className="bg-background" />;
};
