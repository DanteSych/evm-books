import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import openMenu from "../images/open.svg";
import closeMenu from "../images/close.svg";
import { setGlobalState, useGlobalState } from '../utils/GlobalState';
import { useNavigate } from "react-router-dom";

const NavLinks = () => {
  const navigate = useNavigate();
  const [walletLogin] = useGlobalState("walletAddress");
  const [isLogin] = useGlobalState("isLogin");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <button
        className="dropdown-toggle"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <img className="closeMenu" src={closeMenu} alt="Close" />
        ) : (
          <img className="openMenu" src={openMenu} alt="Open" />
        )}
      </button>
      <nav className={`links ${isMenuOpen ? "open" : "closed"}`}>
        <NavLink to={`/${walletLogin}`} onClick={() => setIsMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to={`/${walletLogin}/about`} onClick={() => setIsMenuOpen(false)}>
          About
        </NavLink>
        <NavLink to={`/${walletLogin}/experience`} onClick={() => setIsMenuOpen(false)}>
          Experience
        </NavLink>
        <NavLink to={`/${walletLogin}/education`} onClick={() => setIsMenuOpen(false)}>
          Education
        </NavLink>
        <NavLink to={`/${walletLogin}/contact`} onClick={() => setIsMenuOpen(false)}>
          Contact
        </NavLink>
        {isLogin ? <>
          <Link to="/" onClick={() => setGlobalState("showResume", false)}>
            Edit
          </Link>
          <button className="dc-btn" onClick={() => {
            setGlobalState("isLogin", false);
            setGlobalState("showResume", false);
            setGlobalState("isDataExist", false);
            setGlobalState("walletAddress", null);
            localStorage.removeItem('savedWallet')
            navigate(`/`);
          }}>
            Disconnect
          </button>
        </> :
          <Link to="/" onClick={() => {
            setGlobalState("isLogin", false);
            setGlobalState("showResume", false);
            setGlobalState("isDataExist", false);
            setGlobalState("walletAddress", null);
            localStorage.removeItem('savedWallet')
          }}>
            Login
          </Link>
        }
      </nav>
    </>
  );
};

export default NavLinks;
