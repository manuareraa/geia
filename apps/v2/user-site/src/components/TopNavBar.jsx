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
import { useNavigate, useLocation } from "react-router-dom";

import GeoblocsLogo from "../assets/logo/full-logo-v2.png";

const menuItems = [
  "Home",
  "Stakeholders",
  "Case Studies",
  "Project Stories",
  "Team",
  "How it Works",
  "FAQs",
  "Contact",
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarBrand>
          <img src={GeoblocsLogo} alt="Geoblocs Logo" className="w-52" />
          {/* <p className="font-bold text-inherit">Geoblocs Admin</p> */}
        </NavbarBrand>
      </NavbarContent>

      {/* signup button */}
      <NavbarContent className="w-full manrope-600" justify="end">
        {/* center menu container */}

        <NavbarContent
          className="justify-around hidden w-full gap-8 sm:flex"
          justify="end"
        >
          <NavbarItem isActive={location.pathname === "/"}>
            <Link onPress={() => navigate("/")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                Home
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/stakeholders"}>
            <Link onPress={() => navigate("/stakeholders")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/stakeholders"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                Stakeholders
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/case-studies"}>
            <Link onPress={() => navigate("/case-studies")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/case-studies"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                Case Studies
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/project-stories"}>
            <Link onPress={() => navigate("/project-stories")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/project-stories"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                Project Stories
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/team"}>
            <Link onPress={() => navigate("/team")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/team"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                Team
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/how-it-works"}>
            <Link onPress={() => navigate("/how-it-works")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/how-it-works"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                How it Works
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/faqs"}>
            <Link onPress={() => navigate("/faqs")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/faqs"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                FAQs
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/contact"}>
            <Link onPress={() => navigate("/contact")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/contact"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                Contact
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/wallet"}>
            <Link onPress={() => navigate("/wallet")}>
              <p
                className={`text-black hover:cursor-pointer  ${
                  location.pathname === "/wallet"
                    ? "text-gBlue"
                    : "text-black hover:text-gBlue"
                }`}
              >
                Wallet
              </p>
            </Link>
          </NavbarItem>
          <NavbarItem isActive={location.pathname === "/explore-projects"}>
            <Button
              // size="small"
              className="font-bold text-white bg-gGreen"
              onClick={() => navigate("/explore-projects")}
            >
              Explore Projects
            </Button>
          </NavbarItem>
          {/* <NavbarItem>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </NavbarItem> */}
        </NavbarContent>
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
