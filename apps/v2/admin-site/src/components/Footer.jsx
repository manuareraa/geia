import React from "react";

function Footer(props) {
  return (
    <footer className="bottom-0 p-4  footer footer-center bg-base-300 text-base-content">
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
