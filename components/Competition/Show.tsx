'use client'

import { motion } from 'framer-motion'
import { FaTrophy, FaMedal, FaCertificate, FaCrown } from 'react-icons/fa'

const PrizeShowcase = () => {
    return (
        <div className="relative mt-24 mx-auto max-w-6xl text-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
                <FaCrown className="w-10 h-10 mx-auto text-orange-600 mb-2" />
                Earn Your Honor
            </h2>


            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-12">
                {/* Trophy Block */}
                <motion.div
                    className="bg-yellow-100 p-6 rounded-2xl shadow-md w-64"
                    whileHover={{ scale: 1.1, rotate: 1 }}
                >
                    <FaTrophy className="w-10 h-10 mx-auto text-yellow-600" />
                    <p className="mt-2 font-semibold text-lg">1st & 2nd Place</p>
                    <p className="text-sm text-gray-600">Trophies</p>
                </motion.div>

                {/* Medal Block */}
                <motion.div
                    className="bg-orange-100 p-6 rounded-2xl shadow-md w-64"
                    whileHover={{ scale: 1.1, rotate: -1 }}
                >
                    <FaMedal className="w-10 h-10 mx-auto text-orange-500" />
                    <p className="mt-2 font-semibold text-lg">3rd – 5th Place</p>
                    <p className="text-sm text-gray-600">Medals</p>
                </motion.div>

                {/* Certificate Block */}
                <motion.div
                    className="bg-indigo-100 p-6 rounded-2xl shadow-md w-64"
                    whileHover={{ scale: 1.1 }}
                >
                    <FaCertificate className="w-10 h-10 mx-auto text-indigo-600" />
                    <p className="mt-2 font-semibold text-lg">All Participants</p>
                    <p className="text-sm text-gray-600">Certificates</p>
                </motion.div>
            </div>
        </div>
    )
}

export default PrizeShowcase
