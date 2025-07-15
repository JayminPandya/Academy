import { IPricing } from "@/types";

export const tiers: IPricing[] = [
    {
        name: 'Beginner',
        price: 5000,
        features: [
            '20 Hours coaching',
            'Basic Gameplay',
            'Fundamentals of the chess'
        ],
    },
    {
        name: 'Intermediate',
        price: 7500,
        features: [
            '20 Hours coaching',
            'Tactics & Checkmate Patterns',
            'Game Analysis & Feedback'
        ],
    },
    {
        name: 'Advanced',
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