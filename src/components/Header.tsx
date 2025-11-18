import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/destinations", label: "Destinations" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed-top shadow-sm bg-white" style={{ zIndex: 1050 }}>
      {/* Top bar */}
      <div className="bg-success text-white d-none d-md-block">
        <div className="container d-flex justify-content-between align-items-center py-1 small">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
              <Phone size={16} />
              <span>+84 0325765379</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Mail size={16} />
              <span>sales@vndmc.com</span>
            </div>
          </div>
          <div>Your Gateway to Authentic Vietnam</div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white">
        <div className="container py-3">
          <div className="d-flex justify-content-between align-items-center">
            {/* Logo */}
            <Link to="/" className="d-flex align-items-center">
              <img
                src="/VN DMC_logo_New_1.png"
                alt="Vietnam DMC Logo"
                className="img-fluid"
                style={{ maxHeight: "55px", objectFit: "contain" }}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="d-none d-md-flex align-items-center gap-4">
              {menuLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.path}
                  className={`text-decoration-none fw-medium position-relative ${
                    isActive(link.path) ? "text-success" : "text-dark"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span
                      className="position-absolute start-0 bottom-0"
                      style={{
                        height: "3px",
                        width: "100%",
                        backgroundColor: "#28a745",
                        borderRadius: "2px",
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile toggle */}
            <button
              className="d-md-none btn btn-outline-secondary rounded-circle"
              style={{ width: "40px", height: "40px" }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="fw-bold">{isMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`d-md-none bg-white border-top shadow-sm overflow-hidden transition-all ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
        style={{ transition: "max-height 0.4s ease" }}
      >
        <nav className="d-flex flex-column px-4 py-3 gap-3">
          {menuLinks.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className={`text-decoration-none fw-medium py-2 px-2 rounded ${
                isActive(link.path) ? "text-success bg-light" : "text-dark"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
