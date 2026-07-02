import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

import {
    FaDog,
    FaBars,
    FaTimes
} from "react-icons/fa";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    const navLink =
        "text-gray-600 hover:text-blue-600 transition-all duration-300 font-medium";

    const active =
        "text-blue-600 font-semibold";

    return (

        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">

            <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex justify-between items-center">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 flex justify-center items-center shadow-lg">

                        <FaDog className="text-white text-2xl" />

                    </div>

                    <div>

                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">

                            Dog Behaviour AI

                        </h1>

                        <p className="text-xs text-gray-500">

                            Multimodal Deep Learning

                        </p>

                    </div>

                </Link>

                {/* Desktop Menu */}

                <div className="hidden lg:flex items-center gap-8">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? `${navLink} ${active}` : navLink
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/image"
                        className={({ isActive }) =>
                            isActive ? `${navLink} ${active}` : navLink
                        }
                    >
                        Image
                    </NavLink>

                    <NavLink
                        to="/audio"
                        className={({ isActive }) =>
                            isActive ? `${navLink} ${active}` : navLink
                        }
                    >
                        Audio
                    </NavLink>

                    <NavLink
                        to="/multimodal"
                        className={({ isActive }) =>
                            isActive ? `${navLink} ${active}` : navLink
                        }
                    >
                        Multimodal
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive ? `${navLink} ${active}` : navLink
                        }
                    >
                        About
                    </NavLink>

                    <Link
                        to="/multimodal"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >

                        Start Analysis

                    </Link>

                </div>

                {/* Mobile Button */}

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="lg:hidden text-2xl text-blue-700"
                >

                    {

                        menuOpen
                            ?
                            <FaTimes />
                            :
                            <FaBars />

                    }

                </button>

            </div>

            {/* Mobile Menu */}

            {

                menuOpen &&

                <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">

                    <div className="flex flex-col p-6 gap-5">

                        <NavLink
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className={navLink}
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/image"
                            onClick={() => setMenuOpen(false)}
                            className={navLink}
                        >
                            Image Analysis
                        </NavLink>

                        <NavLink
                            to="/audio"
                            onClick={() => setMenuOpen(false)}
                            className={navLink}
                        >
                            Audio Analysis
                        </NavLink>

                        <NavLink
                            to="/multimodal"
                            onClick={() => setMenuOpen(false)}
                            className={navLink}
                        >
                            Multimodal AI
                        </NavLink>

                        <NavLink
                            to="/about"
                            onClick={() => setMenuOpen(false)}
                            className={navLink}
                        >
                            About
                        </NavLink>

                        <Link
                            to="/multimodal"
                            onClick={() => setMenuOpen(false)}
                            className="mt-3 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-semibold"
                        >

                            Start Analysis

                        </Link>

                    </div>

                </div>

            }

        </nav>

    );

}

export default Navbar;