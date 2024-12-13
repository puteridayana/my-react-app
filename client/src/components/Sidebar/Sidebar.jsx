/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import {
    FaBars,
    FaHome,
    FaFileAlt,
    FaSearch,
    FaSignOutAlt,
    FaUser,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";

const routes = [
    {
        path: "/searchbook",
        name: "Search Book",
        icon: <FaSearch />,
    },
    {
        path: "/managebook",
        name: "Manage Book",
        icon: <FaFileAlt />,
    },
    {
        path: "/manageuser",
        name: "Administrator",
        icon: <FaUser />,
    },
];

const SideBar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        },
        show: {
            opacity: 1,
            width: "auto",
            transition: {
                duration: 0.5,
            },
        },
    };

    const handleLogout = () => {
        axios
            .post(`${process.env.REACT_APP_CALLBACK_URL}/auth/logout`)
            .then((res) => {
                location.reload(true);
            })
            .catch((err) => console.log(err));
        console.log("Logout clicked");
    };

    return (
        <>
            <div className="main-container">
                <motion.div
                    animate={{
                        width: isOpen ? "200px" : "45px",
                        transition: {
                            duration: 0.5,
                            type: "spring",
                            damping: 10,
                        },
                    }}
                    className={`sidebar `}
                >
                    <div className="top_section">
                        <AnimatePresence>
                            {isOpen && (
                                <motion.h5
                                    variants={showAnimation}
                                    initial="hidden"
                                    animate="show"
                                    exit="hidden"
                                    className="logo"
                                >
                                    Library
                                </motion.h5>
                            )}
                        </AnimatePresence>

                        <div className="bars">
                            <FaBars onClick={toggle} />
                        </div>
                    </div>
                    <section className="routes">
                        {routes.map((route, index) => (
                            <NavLink
                                to={route.path}
                                key={index}
                                className="link"
                                activeclassname="active"
                            >
                                <div className="icon">{route.icon}</div>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            variants={showAnimation}
                                            initial="hidden"
                                            animate="show"
                                            exit="hidden"
                                            className="link_text"
                                        >
                                            {route.name}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </NavLink>
                        ))}
                    </section>
                    <section className="logout">
                        <NavLink
                            to="/logout"
                            onClick={handleLogout}
                            className="link-logout"
                            activeclassname="active"
                        >
                            <div className="icon">
                                <FaSignOutAlt />
                            </div>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        variants={showAnimation}
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        className="link_text"
                                    >
                                        Logout
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </NavLink>
                    </section>
                </motion.div>

                <main>{children}</main>
            </div>
        </>
    );
};

export default SideBar;
