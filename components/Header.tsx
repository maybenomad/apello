import Link from "next/link";

import csx from "../util/csx";

export default function Header({ children }) {
  return (
    <header
      className={csx(
        "relative",
        "flex items-center gap-x-4",
        "h-20",
        "p-1 md:p-2",
        "text-white",
        "border-b border-bwhite"
      )}
    >
      {children}
    </header>
  );
}

Header.Menu = function HeaderMenu({ children }) {
  return (
    <ul
      className={csx(
        "flex justify-center items-center gap-x-3 ml-auto",
        "uppercase"
      )}
    >
      {children}
    </ul>
  );
};

Header.MenuItem = function HeaderMenuItem({ disabled = false, children }) {
  return (
    <li
      className={csx(
        "group",
        "relative",
        "box-border ml-0",
        "text-xl font-bold",
        "hover:text-apello",
        "cursor-pointer"
      )}
    >
      {children}
    </li>
  );
};

Header.MenuLink = function HeaderMenuLink({
  text,
  disabled = false,
  href = "#",
}) {
  return (
    <Header.MenuItem disabled={disabled}>
      <Link
        href={href}
        className={csx(
          "selected",
          disabled && "selected-dis",
          "p-1 py-3",
          "ring-violet focus:outline-none focus-visible:ring-4",
          "rounded-xl"
        )}
      >
        {text}
      </Link>
    </Header.MenuItem>
  );
};

Header.MenuDropdown = function HeaderMenuSelect({ text = "", children }) {
  return (
    <Header.MenuItem>
      <div className="flex items-center gap-x-1">
        {text}
        <Header.MenuCaret />
      </div>
      <div
        className={csx(
          "absolute",
          "hidden hover:flex group-hover:flex flex-col",
          "bg-noir shadow rounded",
          "overflow-visible",
          "w-40 left-[-20px] px-4 py-3 z-20"
        )}
      >
        {children}
      </div>
    </Header.MenuItem>
  );
};

Header.MenuDropdownLink = function HeaderMenuDropdownLink({
  disabled = false,
  href,
  children,
}) {
  return (
    <Link
      href={disabled ? "#" : href}
      className={csx(
        "block inline-flex gap-1 items-center",
        "p-1 pr-1",
        "text-base text-white whitespace-nowrap hover:text-violet",
        "transition-colors",
        disabled && "cursor-not-allowed"
      )}
    >
      {children}
    </Link>
  );
};

Header.MenuCaret = function HeaderMenuCaret() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
