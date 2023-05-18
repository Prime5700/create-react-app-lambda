import { Fragment, useState } from "react";
import { UserIcon } from "@heroicons/react/20/solid";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link} from "react-router-dom";
import React from "react";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logoutButton } from "../redux/authRedux";

export default function FlyoutModal({ items, onClose }) {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const triggers = {
    onMouseEnter: () => setOpenMenu(true),
    onMouseLeave: () => setOpenMenu(false),
    onClick: () => setOpenMenu(() => !openMenu),
  };

  return (
    <Menu open={openMenu} handler={setOpenMenu}>
      <MenuHandler>
        <Button
          {...triggers}
          variant="text"
          className="flex items-center gap-2 ml-[-1rem]  py-2 text-base font-normal text-gray-300  hover:bg-gray-700 rounded-md hover:text-white capitalize tracking-normal"
        >
          More Options <ChevronDownIcon strokeWidth={2.5} className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""}`} />
        </Button>
      </MenuHandler>
      <MenuList {...triggers} className="w-[25rem] grid gap-3 z-20 mt-4  overflow-visible">
        <ul className=" flex float-left flex-col gap-1">
          {items.map((item) => (
            <div onClick={onClose} key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
              </div>
              <div>
                <Link to={item.to} className="font-semibold text-gray-900">
                  {item.name}
                  <span className="absolute inset-0" />
                </Link>
                <p className="mt-1 text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}

          {/* {menuItems.map(({ title, description }) => (
            <a href="#" key={title}>
            <MenuItem>
            <Typography variant="h6" color="blue-gray" className="mb-1 hover:text-cyan-500">
            {title}
            </Typography>
            <Typography
            variant="small"
            color="gray"
            className="font-normal hover:text-gray-400"
                >
                {description}
                </Typography>
              </MenuItem>
            </a>
          ))} */}
        </ul>

        <div className="grid grid-cols-2 divide-x divide-gray-900/5 rounded-xl bg-gray-100">
          {!isAuthenticated && (
            <Fragment>
              <Link to="/auth/login" className="flex items-center justify-center gap-x-2.5 font-semibold text-gray-900">
                <button onClick={onClose} className="flex p-3">
                  <UserIcon className="h-5 w-5  text-gray-400" aria-hidden="true" />
                  Log In
                </button>
              </Link>
              <Link to="/auth/signup" className="flex items-center justify-center gap-x-2.5 font-semibold text-gray-900">
                <button onClick={onClose} className="flex p-3">
                  <UserIcon className="h-5 w-5  text-gray-400" aria-hidden="true" />
                  Sign Up
                </button>
              </Link>
            </Fragment>
          )}

          {isAuthenticated && (
            <Fragment>
              <Link to="/my-profile" className="flex items-center justify-center gap-x-2.5 font-semibold text-gray-900 ">
                <button onClick={onClose} className="flex p-3">
                  <UserIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  My Profile
                </button>
              </Link>

              <button
                onClick={() =>
                  logoutButton()(dispatch).then(
                    setInterval(() => {
                      window.location.reload();
                    }, 2000)
                  )
                }
                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                Logout
              </button>
            </Fragment>
          )}
        </div>
      </MenuList>
    </Menu>
  );
}
