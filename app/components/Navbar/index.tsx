"use client";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <div className="max-w-[2560px] mx-auto px-4 sm:px-2 md:px-10 xl:px-20">
          <div className="flex justify-between items-center">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
