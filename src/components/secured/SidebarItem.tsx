import type { MenuItem } from "primereact/menuitem";

interface Props {
  item: MenuItem;
}

/**
 * Sidebar content
 *
 * @param param0
 * @returns
 */
export const SidebarItem = ({ item }: Props) => {
  return (
    <div className="p-menuitem-content flex-auto text-xs ">
      <a className="flex-autoitems-center p-menuitem-link ">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
      </a>
    </div>
  );
};
