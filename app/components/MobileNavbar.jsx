import React from "react";
import Link from "next/link";
import {
  IoCreateOutline,
  IoPersonOutline,
  IoHomeOutline,
  IoSearch,
  IoNotificationsOutline,
} from "react-icons/io5";

const MobileNavbar = () => {

  return (
    <div>
      <div className=" fixed z-50 w-80 h-16 max-w-lg -translate-x-1/2 bg-slate-100 border border-gray-200 rounded-lg bottom-4 left-1/2">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link
            href={"/"}
            data-tooltip-target="tooltip-home"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-s-lg hover:bg-gray-50 group"
          >
            <IoHomeOutline />
            <span className="sr-only">Home</span>
          </Link>
          <div
            id="tooltip-home"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
          >
            Home
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <Link
            href={"/search"}
            data-tooltip-target="tooltip-wallet"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <IoSearch />
            <span className="sr-only">Search</span>
          </Link>
          <div
            id="tooltip-wallet"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
          >
            Search
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <div className="flex items-center justify-center">
            <Link
              href={"/createpost"}
              data-tooltip-target="tooltip-new"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 font-medium bg-emerald-400 rounded-full hover:bg-emerald-300 group "
            >
              <IoCreateOutline />
              <span className="sr-only">Post</span>
            </Link>
          </div>
          <div
            id="tooltip-new"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip "
          >
            Post
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <Link
            href={"/profile"}
            data-tooltip-target="tooltip-settings"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group"
          >
            <IoPersonOutline />
            <span className="sr-only">Profile</span>
          </Link>
          <div
            id="tooltip-settings"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
          >
            Profile
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
          <button
            data-tooltip-target="tooltip-profile"
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 rounded-e-lg hover:bg-gray-50 group"
          >
            <IoNotificationsOutline />
            <span className="sr-only">Notification</span>
          </button>
          <div
            id="tooltip-profile"
            role="tooltip"
            className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip"
          >
            Notification
            <div className="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
