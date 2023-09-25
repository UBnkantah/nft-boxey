import React from "react";
import StatusButton from "./StatusButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav class="font-sans flex flex-wrap justify-between align-middle text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-transparent shadow sm:items-baseline w-full">
        <div
          class="mb-2 sm:mb-0 flex flex-row
"
        >
          <div class="h-10 w-10 self-center mr-2">
            <img
              class="h-10 w-10 self-center"
              alt="image"
              src="https://csscomps.com/images/csscomps.png"
            />
          </div>
          <div>
            <Link
              to="/"
              class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold"
            >
              LogoText
            </Link>
            <br />
            <span class="text-xs text-grey-dark">Beautiful New Tagline</span>
          </div>
        </div>

        <div style={{ display: "table-cell", verticalAlign: "middle" }}>
          <StatusButton />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
