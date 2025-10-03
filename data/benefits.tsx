import { FiBarChart2, FiBriefcase, FiDollarSign, FiLock, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUser } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "What we teach ?",
        description: "Basics of chess with the fundamental principles and smart tactics.",
        bullets: [
            {
                title: "Strategic Foundations",
                description: "Learn the opening principles, center control, and piece development that form the base of every strong chess player.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Tactical Mastery",
                description: "Recognize and execute classic tactics like forks, pins, and skewers to outsmart your opponent.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Positional Understanding",
                description: "Understand long-term advantages like strong squares, pawn structures, and piece activity to dominate the board.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/learn.webp"
    },
    {
        title: "Beginner Friendly",
        description: "it is ok if you do not know anything about chess.",
        bullets: [
            {
                title: "Start from Zero",
                description: "No prior knowledge needed - learn every piece, rule, and move from the ground up.",
                icon: <FiUser size={26} />
            },
            {
                title: "Practice by Playing",
                description: "Engage with fun puzzles and real-game scenarios tailored for absolute beginners.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Real - Time Insights",
                description: "Structured lessons guide you from basics to confident gameplay.",
                icon: <FiPieChart size={26} />
            }
        ],
        imageSrc: "/Section_Image.webp"
    },
]

