import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../services/apiClient";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return null;
  }

  const navigateAndClose = (path) => {
    navigate(path);
    setShow(false);
  };

  const handleLogout = async () => {
    try {
      const res = await apiClient.get("/api/v1/user/admin/logout");
      toast.success(res.data.message);
      setIsAuthenticated(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Logout failed");
    }
  };

  const links = [
    { label: "Dashboard", icon: TiHome, path: "/" },
    { label: "Doctors", icon: FaUserDoctor, path: "/doctors" },
    { label: "Add Admin", icon: MdAddModerator, path: "/admin/addnew" },
    { label: "Add Doctor", icon: IoPersonAddSharp, path: "/doctor/addnew" },
    { label: "Messages", icon: AiFillMessage, path: "/messages" },
  ];

  return (
    <>
      <nav className={`admin-sidebar ${show ? "show" : ""}`}>
        <div className="sidebar-brand">
          <img src="/logo.png" alt="Yashveerji Care" className="sidebar-logo" />
          <div>
            <span className="brand-eyebrow">Yashveerji Care</span>
            <p>Admin Control</p>
          </div>
        </div>
        <div className="sidebar-links">
          {links.map(({ label, icon: Icon, path }) => (
            <button
              type="button"
              key={path}
              className={`sidebar-link ${location.pathname === path ? "active" : ""}`}
              onClick={() => navigateAndClose(path)}
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button type="button" className="sidebar-link logout" onClick={handleLogout}>
          <RiLogoutBoxFill />
          <span>Logout</span>
        </button>
      </nav>
      <button
        type="button"
        className="sidebar-trigger"
        onClick={() => setShow((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        <GiHamburgerMenu />
      </button>
    </>
  );
};

export default Sidebar;
