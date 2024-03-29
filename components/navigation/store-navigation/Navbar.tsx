import { useState } from "react";

import { useQuery } from "@apollo/client";
import { GET_SHOP_HOME_DATA } from "../../../graphql/query_vars";
import { MobileNav } from "./navbar/MobileNav";
import { RightNav } from "./navbar/RightNav";
import { LeftNav } from "./navbar/LeftNav";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const { data } = useQuery(GET_SHOP_HOME_DATA);

  if (!data) return null;
  return (
    <div className="border-b border-gray-200 bg-white">
      {/* Mobile menu */}
      <MobileNav
        open={open}
        setOpen={setOpen}
        getAllCategories={data.getAllCategories}
      ></MobileNav>

      <header className="relative z-20">
        <nav
          aria-label="Top"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="">
            <div className="h-16 flex items-center">
              <LeftNav
                getAllCategories={data.getAllCategories}
                setOpen={setOpen}
              />
              <RightNav />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
