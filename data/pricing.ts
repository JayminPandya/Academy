import { IPricing } from "@/types";
import { FaChessKnight, FaChessBishop, FaChessRook } from "react-icons/fa";

export const tiers: IPricing[] = [
  {
    name: "Beginner",
    icon: FaChessKnight({ size: 26 }) as JSX.Element,
    price: 5000,
    features: [
      "20 Hours coaching",
      "Game - based learning",
      "One and Three Move Checkmate Patterns",
    ],
    courceDetails: [
      "Understanding the chessboard and pieces",
      "Piece movements and values",
      "Basic rules including castling, en passant, promotion",
      "Check, checkmate, stalemate concepts",
      "Opening principles — controlling center, developing pieces, castling safely",
      "Essential tactics: forks, pins, skewers, discovered attacks",
      "Common checkmating patterns",
      "Basic endgames to know (king+queen vs king, king+rook vs king)",
      "Important mistakes beginners make and how to avoid them",
      "How to record and review games using notation",
    ],
  },
  {
    name: "Intermediate",
    icon: FaChessBishop({ size: 26 }) as JSX.Element,
    price: 7500,
    features: [
     "20 Hours coaching",
      "Endgame Patterns and Techniques",
      "Four and Five Move Checkmate Patterns",
    ],
    courceDetails: [
      "In-depth opening principles and popular opening repertoires for White and Black",
      "Planning and positional evaluation — identifying weaknesses and strengths in a position",
      "Advanced tactics and combinations to improve calculation and pattern recognition",
      "Strategic concepts : pawn structure, weak squares, space advantage, and piece coordination",
      "Common middlegame plans and attacking techniques",
      "Endgame theory including rook and pawn endgames, opposition, key mating patterns",
      "Practical game analysis and exercises to apply learning",
      "Regular playing sessions with post-game reviews and feedback",
    ],
  },
  {
    name: "Advanced",
    icon: FaChessRook({ size: 26 }) as JSX.Element,
    price: 10000,
    features: [
      "20 Hours coaching",
      "FIDE Title Player Traning Session",
      "Grandmaster's various Game Analysis",
    ],
    courceDetails: [
      "In-depth study of classical and modern opening repertoires with emphasis on theory and novelty",
      "Advanced positional strategies focusing on imbalances, prophylaxis, and long-term planning",
      "Complex tactical themes including sacrifices, combinations, and calculation under pressure",
      "Middlegame mastery: strategic maneuvering, attacking and defensive techniques at a high level",
      "Comprehensive endgame study covering theoretical and practical endgames, including minor piece endings",
      "Analysis of grandmaster games with focus on thought process and decision-making",
      "Psychological aspects of competitive chess : time management, nerves, and opponent profiling",
      "Regular playing practice with annotated game reviews and personalized feedback",
    ],
  },
];

