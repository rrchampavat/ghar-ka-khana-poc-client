import Avatar from "@/ui/components/avatar/Avatar";
import Link from "@/ui/components/link/Link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image
} from "@heroui/react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import useDarkMode from "use-dark-mode";

interface DROPDOWN_ITEM {
  key: string;
  label: string;
  color:
    | "primary"
    | "danger"
    | "secondary"
    | "success"
    | "warning"
    | "default"
    | undefined;
  onAction?: () => void;
}

const Header = () => {
  const { value: isDarkMode } = useDarkMode(false);

  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const imageSrc = isDarkMode
    ? "/svgs/tiffin-icon-white.png"
    : "/svgs/tiffin-icon-black.png";

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  const dropDownItems: DROPDOWN_ITEM[] = [
    {
      key: "info",
      label: "User Info",
      color: "primary"
    },
    {
      key: "logout",
      label: "Logout",
      color: "danger",
      onAction: handleLogout
    }
  ];

  const navItems = [
    {
      label: "Home",
      href: "/",
      isActive: currentPath === "/"
    },
    {
      label: "Users",
      href: "users",
      isActive: currentPath === "/users"
    },
    {
      label: "Restaurants",
      href: "restaurants",
      isActive: currentPath === "/restaurants"
    }
  ];

  return (
    <Navbar className="shadow-lg">
      <NavbarBrand>
        <Image
          src={imageSrc}
          alt="gkk-logo"
          width={30}
          radius="none"
          className="cursor-pointer"
        />
        <p className="cursor-pointer font-bold text-inherit">GKK</p>
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.label} isActive={item.isActive}>
            <Link
              href={item.href}
              color={item.isActive ? "primary" : "foreground"}
              underline={item.isActive ? "always" : "hover"}
              target="_blank"
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar as="button" name="John Doe" />
            </DropdownTrigger>

            <DropdownMenu>
              {dropDownItems.map((item) => (
                <DropdownItem
                  key={item.key}
                  color={item.color}
                  onAction={item.onAction}
                >
                  {item.label}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
