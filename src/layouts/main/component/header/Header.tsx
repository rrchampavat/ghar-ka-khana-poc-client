import useLocalStorage from "@/hooks/useLocalStoage";
import getUserById from "@/services/user/getUserById.service";
import { USER_ROLE } from "@/shared/constants/enums";
import Link from "@/ui/components/link/Link";
import User from "@/ui/components/user/User";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image
} from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
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

  const [lclUser] = useLocalStorage("user", {});

  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();

  const imageSrc = isDarkMode
    ? "/svgs/tiffin-icon-white.png"
    : "/svgs/tiffin-icon-black.png";

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("accessToken");
    navigate("/login");
  };

  const dropDownItems: DROPDOWN_ITEM[] = [
    {
      key: "info",
      label: "My profile",
      color: "primary",
      onAction: () => navigate(`/users/${loggedUser.id}`)
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

  const { data } = useQuery({
    queryKey: ["user-details", lclUser.id],
    queryFn: () => getUserById(lclUser.id),
    enabled: !lclUser.id
  });

  const loggedUser = lclUser?.id ? lclUser : data;

  return (
    <Navbar className="shadow-lg" maxWidth="xl">
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
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <User
                name={`${loggedUser?.first_name} ${loggedUser?.last_name}`}
                description={USER_ROLE[loggedUser?.role]}
                avatarProps={{
                  src: loggedUser?.user_image,
                  as: "button",
                  name: `${loggedUser?.first_name} ${loggedUser?.last_name}`
                }}
                className="cursor-pointer"
              />
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
