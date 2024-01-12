import React from "react";
import Link from "next/link";
import {
  IoCreateOutline,
  IoPersonOutline,
  IoSettingsOutline,
  IoSearch,
  IoLogOutOutline,
} from "react-icons/io5";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: 'Logout',
      text: 'Mau logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yups, dah males!',
      cancelButtonText: 'Ga Jadi',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        Cookies.remove("id");
        router.push("/login");
      }
    });
  };
  return (
    <div>
      <div className="relative h-screen pattern">
        <nav className="z-20 shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg fixed top-2/4 -translate-y-2/4 left-6 min-h-[auto] min-w-[64px] flex-col rounded-lg border hidden md:flex">
          <Link
            href="#profile"
            className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100"
          >
            <IoPersonOutline />

            <small className="text-center text-xs font-medium"> Profile </small>
          </Link>

          <Link
            href="/createpost"
            className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100"
          >
            <IoCreateOutline />

            <small className="text-center text-xs font-medium"> Say It! </small>
          </Link>

          <Link
            href="#search"
            className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
          >
            <IoSearch />

            <small className="text-center text-xs font-medium"> Search </small>
          </Link>

          <Link
            href="#settings"
            className="flex aspect-square min-h-[32px] w-16 flex-col items-center justify-center gap-1 rounded-md p-1.5 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-slate-800"
          >
            <IoSettingsOutline />

            <small className="text-center text-xs font-medium">
              {" "}
              Settings{" "}
            </small>
          </Link>

          <hr className="dark:border-gray-700/60" />

          <button
            onClick={handleLogout}
            className="flex h-16 w-16 flex-col items-center justify-center gap-1 text-fuchsia-900 dark:text-gray-400"
          >
            <IoLogOutOutline />

            <small className="text-xs font-medium">Logout</small>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
