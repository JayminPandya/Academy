'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { tournamentDetails } from '@/data/tournament'
import GameDetails from '@/components/Competition/Timer'
import FeeButton from './FeeBtn'
import PrizeShowcase from './Show'
import { FaTimes } from 'react-icons/fa'

const TournamentPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleFeeClick = () => {
        setIsLoading(true)
        // Force loading for 3 seconds
        setTimeout(() => {
            setIsLoading(false)
            setIsModalOpen(true)
        }, 3000)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    return (
        <section
            id="hero"
            className="relative flex items-center justify-center pb-11 pt-32 md:pt-40 px-5"
        >
            {/* Background Grid */}
            <div className="absolute left-0 top-0 bottom-0 -z-10 w-full">
                <div className="absolute inset-0 h-full w-full bg-hero-background bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
            </div>

            {/* Bottom Gradient */}
            <div className="absolute left-0 right-0 bottom-0 backdrop-blur-[2px] h-40 bg-gradient-to-b from-transparent via-[rgba(233,238,255,0.5)] to-[rgba(202,208,230,0.5)]" />

            <div className="text-center">
                <h1 className="text-4xl md:text-6xl md:leading-tight font-bold text-foreground max-w-lg md:max-w-2xl mx-auto">
                    {tournamentDetails.heading}
                </h1>
                <p className="mt-4 text-foreground max-w-lg mx-auto">{tournamentDetails.subheading}</p>

                <GameDetails />

                {/* Interlocking Button */}
                <div className="mt-6 flex flex-col sm:flex-row items-center sm:gap-4 w-fit mx-auto relative">
                    <FeeButton dark onClick={handleFeeClick} />
                </div>

                {/* QR Modal (also contains loading state) */}
                {(isModalOpen || isLoading) && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-xl p-6 w-[90%] max-w-sm text-center relative shadow-xl">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 border-r-black border-l-black mb-4"></div>
                                    <p className="text-lg font-medium">Processing...</p>
                                </div>
                            ) : (
                                <>
                                     <button
                                        onClick={closeModal}
                                        className="absolute top-2 right-3 text-gray-600 hover:text-black text-lg"
                                    >
                                        <FaTimes />
                                    </button>
                                    <h2 className="text-xl font-bold mb-4">Closed</h2>
{/*                                     <Image
                                        src="/qr.png"
                                        alt="UPI QR"
                                        width={200}
                                        height={200}
                                        className="mx-auto"
                                    /> */}
{/*                                     <p className="mt-4 text-sm text-gray-700 font-normal">
                                        UPI: <br /><span className="font-semibold text-black text-lg">chiraggandhi2605@okhdfcbank</span>
                                    </p> */}
     <p className="mt-4 text-sm text-gray-700 font-normal">
                                        <br /><span className="font-semibold text-black text-lg">Better Luck Next Time</span>
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                )}
                <PrizeShowcase />
            </div>
        </section>
    )
}

export default TournamentPage
