import type { MenuItem } from "primereact/menuitem";

import "./SidebarItem.css";

export type SidebarItemType =
  | MenuItem & {
      isActive?: boolean;
      items?: SidebarItemType[] | SidebarItemType[][] | SidebarItemType;
    };

interface Props {
  item: SidebarItemType;
}

/**
 * Sidebar content
 *
 * @param param0
 * @returns
 */
export const SidebarItem = ({ item }: Props) => {
  return (
    <div
      className={`text-primary-content sidebar-item ${
        item.isActive ? "active" : ""
      } p-menuitem-content flex-auto text-xs `}
    >
      <a className="flex-autoitems-center p-menuitem-link ">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
      </a>
    </div>
  );
};
