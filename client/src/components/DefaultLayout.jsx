import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.users);

  const userMenu = [
    { name: "Home", icon: "ri-home-line", path: "/" },
    { name: "Bookings", icon: "ri-file-list-line", path: "/bookings" },
    { name: "Profile", icon: "ri-user-line", path: "/profile" },
    { name: "Logout", icon: "ri-logout-box-line", path: "/logout" },
  ];

  const adminMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Buses", path: "/admin/buses", icon: "ri-bus-line" },
    { name: "Users", path: "/admin/users", icon: "ri-user-line" },
    { name: "Bookings", path: "/admin/bookings", icon: "ri-file-list-line" },
    { name: "Logout", path: "/logout", icon: "ri-logout-box-line" },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;

  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }

  return (
    <div className='flex lg:flex-row h-screen'>
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-gray-900 text-white transition-all duration-300 ${
          collapsed ? "w-20" : "w-56"
        }`}
      >
        {/* Sidebar Header */}
        <div className='p-4 flex items-center justify-between border-b border-gray-700'>
          <div className='flex flex-col items-center mb-1 sm:flex-row justify-between w-full'>
            <h1 className='text-2xl mb-2 font-bold'>SB</h1>
            <div className=''>
              {collapsed || <h3>Role : {user?.isAdmin ? "Admin" : "User"}</h3>}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className='flex  flex-col gap-2 p-4'>
          {menuToBeRendered.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                activeRoute === item.path
                  ? "bg-gray-800 text-blue-400 shadow-lg"
                  : "hover:bg-gray-800 hover:text-blue-300"
              }`}
              onClick={() => {
                if (item.path === "/logout") {
                  localStorage.removeItem("token");
                  navigate("/login");
                } else {
                  navigate(item.path);
                }
              }}
            >
              <i className={`${item.icon} text-2xl`}></i>
              {!collapsed && <span className='text-xl'>{item.name}</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 flex flex-col bg-gray-100'>
        {/* Header */}
        <div className='flex justify-between items-center bg-white shadow p-4'>
          <div className='flex items-center gap-4'>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className='text-xl bg-[#1F2937] hover:bg-gray-800 hover:text-blue-300 p-2 rounded-md text-white'
            >
              {collapsed ? (
                <i className='ri-menu-2-fill'></i>
              ) : (
                <i className='ri-close-line'></i>
              )}
            </button>
            <h1 className='text-lg font-semibold'>
              {user?.isAdmin ? "Admin Dashboard" : "User Dashboard"}
            </h1>
          </div>
          <div className='flex items-center gap-4'>
            <p className='text-sm text-gray-600'>{user?.name}</p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className='bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600'
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='p-4 overflow-auto'>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
