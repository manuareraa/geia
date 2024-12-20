import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
// import { AcmeLogo } from "./AcmeLogo.jsx";
import { useStore } from "zustand";
import { useAuthStore, logoutAdminUser } from "../state-management/AppState";
import { useNavigate, useLocation } from "react-router-dom";

import GeoblocsLogo from "../assets/logo/full-logo-v2.png";

const menuItems = [
  // "Profile",
  // "Dashboard",
  // "Activity",
  // "Analytics",
  // "System",
  // "Deployments",
  // "My Settings",
  // "Team Settings",
  // "Help & Feedback",
  // "Log Out",
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useStore(useAuthStore);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  let lastScrollY = 0;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setNavbarHidden(true);
    } else {
      setNavbarHidden(false);
    }
    lastScrollY = window.scrollY;
  };

  const handleLogout = async () => {
    console.log("Logging out user:", user);
    const result = await logoutAdminUser();
    console.log("Logout result:", result);
    if (result.status === "success") {
      console.log("Logout successful");
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("Page: ", location.pathname);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      isBlurred
      shouldHideOnScroll={true}
      isHidden={navbarHidden}
      maxWidth="full"
      className="py-4 manrope-400"
    >
      {/* <img src={GeoblocsLogo} alt="Geoblocs Logo" className="px-0 w-52" /> */}

      {/* logo and name container */}
      <NavbarContent className="z-10 w-full">
        {/* mobile menu toggle */}
        {isAuthenticated === true ? (
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        ) : null}
        <NavbarBrand>
          <img src={GeoblocsLogo} alt="Geoblocs Logo" className="w-52" />
          {/* <p className="font-bold text-inherit">Geoblocs Admin</p> */}
        </NavbarBrand>
      </NavbarContent>

      {/* signup button */}
      <NavbarContent className="w-full manrope-600" justify="end">
        {/* center menu container */}
        {isAuthenticated === true ? (
          <NavbarContent
            className="justify-around hidden w-full gap-8 sm:flex"
            justify="end"
          >
            <NavbarItem isActive={location.pathname === "/dashboard/projects"}>
              <Link onPress={() => navigate("/dashboard/projects")}>
                <p
                  className={`text-black hover:cursor-pointer  ${
                    location.pathname === "/dashboard/projects"
                      ? "text-gBlue"
                      : "text-black hover:text-gBlue"
                  }`}
                >
                  Dashboard
                </p>
              </Link>
            </NavbarItem>
            <NavbarItem
              isActive={location.pathname === "/dashboard/projects/new"}
            >
              <Link onPress={() => navigate("/dashboard/projects/new")}>
                <p
                  className={`text-black hover:cursor-pointer  ${
                    location.pathname === "/dashboard/projects/new"
                      ? "text-gBlue"
                      : "text-black hover:text-gBlue"
                  }`}
                >
                  Add New Project
                </p>
              </Link>
            </NavbarItem>
            {/* <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem> */}
          </NavbarContent>
        ) : null}
        <NavbarItem
          children={
            isAuthenticated === true ? (
              <button
                className="ml-6 text-white btn btn-xs sm:btn-sm md:btn-md bg-gGreen manrope-700"
                onClick={handleLogout}
              >
                <p className="text-xs md:text-sm lg:text-md">Logout</p>
              </button>
            ) : null
          }
        />
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
