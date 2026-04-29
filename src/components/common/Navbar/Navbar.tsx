// src/components/common/Navbar.tsx

"use client";

import Link from "next/link";
import "./Navbar.scss";

import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

import {
  MdEmail,
  MdPhone,
} from "react-icons/md";

export default function Navbar() {
  return (
    <header className="navbar">
      
      {/* TOP BAR */}
      <div className="topbar">
        <div className="left">
          <MdEmail />
          <span>info@example.com</span>
        </div>

        <div className="right">
          <MdPhone />
          <span>+012 345 6789</span>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">
          <h1>
            CHE<span>FER</span>
          </h1>
        </div>

        {/* NAV LINKS */}
        <nav className="nav-links">
          <Link href="/" className="active">
            Home
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/menu">
            Menu
          </Link>

          <Link href="/chefs">
            Chefs
          </Link>

          <Link href="/contact">
            Contact
          </Link>
        </nav>

        {/* ACTIONS */}
        <div className="nav-actions">

          <div className="social-icon">
            <FaFacebookF />
          </div>

          <div className="social-icon">
            <FaTwitter />
          </div>

          <div className="social-icon">
            <FaLinkedinIn />
          </div>

          <button className="cta-btn">
            Book Table
          </button>

        </div>
      </div>
    </header>
  );
}