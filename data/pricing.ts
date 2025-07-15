import { IPricing } from "@/types";
import { FaChessKnight, FaChessBishop, FaChessRook } from "react-icons/fa";

export const tiers: IPricing[] = [
    {
        name: 'Beginner',
        icon: FaChessKnight({ size: 26 }) as JSX.Element,
        price: 5000,
        features: [
            '20 Hours coaching',
            'Basic Gameplay',
            'Fundamentals of the chess'
        ],
    },
    {
        name: 'Intermediate',
        icon: FaChessBishop({ size: 26 }) as JSX.Element,
        price: 7500,
        features: [
            '20 Hours coaching',
            'Tactics & Checkmate Patterns',
            'Game Analysis & Feedback'
        ],
    },
    {
        name: 'Advanced',
        icon: FaChessRook({ size: 26 }) as JSX.Element,
        price: 10000,
        features: [
            '20 Hours coaching',
            'Personalized Coaching Plan',
            'Unlimited Practice Sessions',
            'Grandmaster Training',
            'Tournament Preparation',
            'Dedicated Mentor Support',
        ],
    }
]
