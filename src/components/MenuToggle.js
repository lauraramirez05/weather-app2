import { Dropdown, Menu } from "@mui/base";
import { Listbox, MenuButton, MenuItem } from "../styles/MenuStyle.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const MenuToggle = () => {
  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <Dropdown>
      <MenuButton>
        <FontAwesomeIcon icon={faBars} />
      </MenuButton>
      <Menu slots={{ listbox: Listbox }}>
        <MenuItem onClick={createHandleMenuClick("Profile")}>Help</MenuItem>
        <MenuItem onClick={createHandleMenuClick("Log out")}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
};

export default MenuToggle;
