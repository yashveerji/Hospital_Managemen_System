import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { toast } from "react-toastify";
import { Context } from "../main";
import { apiClient } from "../services/apiClient";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    apiClient
      .get("/api/v1/user/patient/logout")
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || "Logout failed");
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <header className="nav-wrapper">
      <nav className="site-nav container">
        <div className="logo">
          <img src="/logo.png" alt="Yashveerji Care logo" className="logo-img" />
          <span className="logo-wordmark">Yashveerji Care</span>
        </div>
        <div className={show ? "navLinks showmenu" : "navLinks"}>
          <div className="links">
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(false)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(false)}>
              About Us
            </Link>
          </div>
          <div className="nav-actions">
            <Link
              to={"/appointment"}
              className="nav-cta"
              onClick={() => setShow(false)}
            >
              Book a Visit
            </Link>
            {isAuthenticated ? (
              <button className="ghost-btn" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <button className="ghost-btn" onClick={goToLogin}>
                Login
              </button>
            )}
          </div>
        </div>
        <button
          type="button"
          className="hamburger"
          onClick={() => setShow((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <GiHamburgerMenu />
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
