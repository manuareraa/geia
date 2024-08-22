import React from "react";
import { useLocation } from "react-router-dom";

function Footer(props) {
  const location = useLocation();
  return (
    <footer
      className={
        location.pathname === "/mobile-verification"
          ? "hidden"
          : "bottom-0 p-4  footer footer-center bg-base-300 text-base-content"
      }
    >
      <aside>
        <p>
          Copyright © ${new Date().getFullYear()} - All right reserved by GEIA
          Inc.
        </p>
      </aside>
    </footer>
  );
}

export default Footer;
