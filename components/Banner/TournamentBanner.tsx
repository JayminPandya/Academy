"use client";
import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaTimes, FaChessKnight } from "react-icons/fa";
import "./ban.css";
import Link from "next/link";

const TournamentModal = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, []);

    if (!open) return null;

    return (
        <>
            <div className="banner-blur-overlay"></div>
            <div className="banner-overlay">
                <div className="banner-modal">
                    <div className="banner-header">
                        <FaChessKnight className="banner-chess-icon" />
                        <h2 className="banner-title">Chess Tournament</h2>
                        <button className="banner-close" onClick={() => setOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    <div className="banner-content">
                        <div className="banner-detail">
                            <FaCalendarAlt className="banner-icon" />
                            <span className="text-xl font-extrabold">20th July, 2025</span>
                        </div>

                        <div className="banner-detail">
                            <FaMapMarkerAlt className="banner-icon" />
                            <span className="text-lg font-normal">Gurukulam Intl. School - <span className="font-semibold text-green-500">Botad</span></span>
                        </div>

                        <Link href="/tournaments">
                            <button className="banner-button" onClick={() => setOpen(false)}>
                                Register Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TournamentModal;